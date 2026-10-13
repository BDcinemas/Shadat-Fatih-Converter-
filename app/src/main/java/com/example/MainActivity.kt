package com.example

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.os.Environment
import android.util.Base64
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.FileProvider
import com.example.ui.theme.MyApplicationTheme
import java.io.File
import java.io.FileOutputStream

class MainActivity : ComponentActivity() {

  private var fileUploadCallback: ValueCallback<Array<Uri>>? = null

  // File picker launcher for HTML file inputs
  private val filePickerLauncher =
    registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
      if (result.resultCode == Activity.RESULT_OK) {
        val data = result.data
        val clipData = data?.clipData
        val uri = data?.data

        val results = mutableListOf<Uri>()
        if (clipData != null) {
          for (i in 0 until clipData.itemCount) {
            results.add(clipData.getItemAt(i).uri)
          }
        } else if (uri != null) {
          results.add(uri)
        }

        fileUploadCallback?.onReceiveValue(results.toTypedArray())
      } else {
        fileUploadCallback?.onReceiveValue(null)
      }
      fileUploadCallback = null
    }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()

    setContent {
      MyApplicationTheme {
        SfcConverterScreen(
          onOpenFileChooser = { callback, acceptTypes, multiple ->
            fileUploadCallback = callback
            val intent = Intent(Intent.ACTION_GET_CONTENT).apply {
              addCategory(Intent.CATEGORY_OPENABLE)
              type = if (acceptTypes.isNotEmpty() && acceptTypes[0].isNotBlank()) acceptTypes[0] else "*/*"
              if (acceptTypes.size > 1) {
                putExtra(Intent.EXTRA_MIME_TYPES, acceptTypes)
              }
              putExtra(Intent.EXTRA_ALLOW_MULTIPLE, multiple)
            }
            filePickerLauncher.launch(Intent.createChooser(intent, "Select Files for Conversion"))
          }
        )
      }
    }
  }
}

class AndroidWebAppBridge(private val context: Context) {
  @JavascriptInterface
  fun onFileDownloaded(filename: String, dataUrl: String, mimeType: String) {
    try {
      val base64Data = if (dataUrl.contains(",")) dataUrl.substringAfter(",") else dataUrl
      val fileBytes = Base64.decode(base64Data, Base64.DEFAULT)

      // Save to external files dir or cache
      val downloadsDir = context.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS)
        ?: context.filesDir
      val targetFile = File(downloadsDir, filename)

      FileOutputStream(targetFile).use { it.write(fileBytes) }

      val contentUri = FileProvider.getUriForFile(
        context,
        "${context.packageName}.fileprovider",
        targetFile
      )

      val shareIntent = Intent(Intent.ACTION_SEND).apply {
        type = if (mimeType.isNotBlank()) mimeType else "*/*"
        putExtra(Intent.EXTRA_STREAM, contentUri)
        putExtra(Intent.EXTRA_SUBJECT, "Converted file: $filename")
        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      }

      context.startActivity(Intent.createChooser(shareIntent, "Share or Save $filename").apply {
        addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      })

      (context as? Activity)?.runOnUiThread {
        Toast.makeText(context, "Saved $filename! Opening share options...", Toast.LENGTH_LONG).show()
      }
    } catch (e: Exception) {
      e.printStackTrace()
      (context as? Activity)?.runOnUiThread {
        Toast.makeText(context, "Download failed: ${e.message}", Toast.LENGTH_SHORT).show()
      }
    }
  }
}

@OptIn(ExperimentalMaterial3Api::class)
@SuppressLint("SetJavaScriptEnabled")
@Composable
fun SfcConverterScreen(
  onOpenFileChooser: (callback: ValueCallback<Array<Uri>>, acceptTypes: Array<String>, multiple: Boolean) -> Unit
) {
  val context = LocalContext.current
  var webViewInstance by remember { mutableStateOf<WebView?>(null) }
  var webProgress by remember { mutableIntStateOf(0) }
  var isLoading by remember { mutableStateOf(true) }
  var showInfoDialog by remember { mutableStateOf(false) }

  // Handle hardware / gesture back button
  BackHandler(enabled = webViewInstance?.canGoBack() == true) {
    webViewInstance?.goBack()
  }

  Scaffold(
    topBar = {
      TopAppBar(
        title = {
          Row(verticalAlignment = Alignment.CenterVertically) {
            Surface(
              shape = RoundedCornerShape(8.dp),
              color = Color(0xFF0F172A),
              modifier = Modifier.size(32.dp)
            ) {
              Box(contentAlignment = Alignment.Center) {
                Text(
                  text = "SFC",
                  color = Color(0xFF38BDF8),
                  fontWeight = FontWeight.Black,
                  fontSize = 11.sp
                )
              }
            }
            Spacer(modifier = Modifier.width(10.dp))
            Column {
              Text(
                text = "SFC Converter",
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSurface
              )
              Text(
                text = "Shadat Fatih Converter",
                fontSize = 11.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
              )
            }
          }
        },
        actions = {
          IconButton(onClick = { webViewInstance?.reload() }) {
            Icon(
              imageVector = Icons.Default.Refresh,
              contentDescription = "Reload",
              tint = MaterialTheme.colorScheme.onSurface
            )
          }
          IconButton(onClick = { showInfoDialog = true }) {
            Icon(
              imageVector = Icons.Default.Info,
              contentDescription = "About SFC",
              tint = MaterialTheme.colorScheme.onSurface
            )
          }
        },
        colors = TopAppBarDefaults.topAppBarColors(
          containerColor = MaterialTheme.colorScheme.surface
        )
      )
    }
  ) { paddingValues ->
    Column(
      modifier = Modifier
        .fillMaxSize()
        .padding(paddingValues)
    ) {
      if (isLoading && webProgress < 100) {
        LinearProgressIndicator(
          progress = { webProgress / 100f },
          modifier = Modifier.fillMaxWidth(),
          color = Color(0xFF38BDF8)
        )
      }

      AndroidView(
        modifier = Modifier.fillMaxSize(),
        factory = { ctx ->
          WebView(ctx).apply {
            layoutParams = ViewGroup.LayoutParams(
              ViewGroup.LayoutParams.MATCH_PARENT,
              ViewGroup.LayoutParams.MATCH_PARENT
            )

            settings.apply {
              javaScriptEnabled = true
              domStorageEnabled = true
              allowFileAccess = true
              allowContentAccess = true
              databaseEnabled = true
              loadWithOverviewMode = true
              useWideViewPort = true
              cacheMode = WebSettings.LOAD_DEFAULT
              mediaPlaybackRequiresUserGesture = false
            }

            // JavaScript bridge for blob downloads
            addJavascriptInterface(AndroidWebAppBridge(ctx), "AndroidBridge")

            webViewClient = object : WebViewClient() {
              override fun shouldOverrideUrlLoading(
                view: WebView?,
                request: WebResourceRequest?
              ): Boolean {
                val url = request?.url?.toString() ?: return false
                if (url.startsWith("http://") || url.startsWith("https://")) {
                  // External links open in browser
                  val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                  ctx.startActivity(intent)
                  return true
                }
                return false
              }

              override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                isLoading = false

                // Inject blob download listener script into web view
                val jsInterceptor = """
                  (function() {
                    if (window.__sfc_download_hooked) return;
                    window.__sfc_download_hooked = true;
                    document.addEventListener('click', function(e) {
                      var target = e.target.closest('a[download]');
                      if (target && target.href && target.href.indexOf('blob:') === 0) {
                        fetch(target.href).then(function(res) {
                          return res.blob();
                        }).then(function(blob) {
                          var reader = new FileReader();
                          reader.onloadend = function() {
                            if (window.AndroidBridge && window.AndroidBridge.onFileDownloaded) {
                              window.AndroidBridge.onFileDownloaded(
                                target.download || 'converted_file',
                                reader.result,
                                blob.type || 'application/octet-stream'
                              );
                            }
                          };
                          reader.readAsDataURL(blob);
                        }).catch(function(err) {
                          console.error('Download hook error', err);
                        });
                      }
                    }, true);
                  })();
                """.trimIndent()
                view?.evaluateJavascript(jsInterceptor, null)
              }
            }

            webChromeClient = object : WebChromeClient() {
              override fun onProgressChanged(view: WebView?, newProgress: Int) {
                webProgress = newProgress
                if (newProgress >= 100) {
                  isLoading = false
                }
              }

              override fun onShowFileChooser(
                webView: WebView?,
                filePathCallback: ValueCallback<Array<Uri>>?,
                fileChooserParams: FileChooserParams?
              ): Boolean {
                if (filePathCallback == null) return false
                val acceptTypes = fileChooserParams?.acceptTypes ?: arrayOf("*/*")
                val isMultiple =
                  fileChooserParams?.mode == FileChooserParams.MODE_OPEN_MULTIPLE
                onOpenFileChooser(filePathCallback, acceptTypes, isMultiple)
                return true
              }
            }

            // Load the offline bundled SFC Converter Web application
            loadUrl("file:///android_asset/web/index.html")
            webViewInstance = this
          }
        },
        update = { webView ->
          webViewInstance = webView
        }
      )
    }
  }

  if (showInfoDialog) {
    AlertDialog(
      onDismissRequest = { showInfoDialog = false },
      title = {
        Row(verticalAlignment = Alignment.CenterVertically) {
          Icon(
            imageVector = Icons.Default.Shield,
            contentDescription = null,
            tint = Color(0xFF38BDF8),
            modifier = Modifier.size(24.dp)
          )
          Spacer(modifier = Modifier.width(8.dp))
          Text(text = "SFC Shadat Fatih Converter")
        }
      },
      text = {
        Column {
          Text(
            text = "Version 1.0.0 • Developed by Shadat Fatih",
            fontWeight = FontWeight.Bold,
            fontSize = 13.sp,
            color = MaterialTheme.colorScheme.primary
          )
          Spacer(modifier = Modifier.height(8.dp))
          Text(
            text = "SFC is a 100% secure, offline-capable file converter that processes files locally on your device without sending any data over the internet.\n\n" +
              "• PDF Tools: Merge, Split, Rotate, Delete pages, Images to PDF, Extract Text\n" +
              "• Image Tools: PNG, JPG, WebP conversion, resize, compress\n" +
              "• Document: Text & HTML to PDF, DOCX extractor\n" +
              "• Spreadsheet: CSV, Excel (XLSX), JSON\n" +
              "• Audio & Video: Lossless audio extraction\n" +
              "• Archive: Create & extract ZIP archives safely",
            fontSize = 12.sp,
            lineHeight = 18.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant
          )
        }
      },
      confirmButton = {
        TextButton(onClick = { showInfoDialog = false }) {
          Text("Close")
        }
      }
    )
  }
}
