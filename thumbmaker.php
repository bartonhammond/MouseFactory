  
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Thumbnail Maker</title>
  <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">

  <style>
      body{
        padding: 10px 30px;
      }
  </style>
</head>
<body>

<?php 
  $directory  = "Gallery/";
  $width      = "240";
  if( isset($_GET['directory']) ){
      $directory = $_GET['directory'];
  }
  if( isset($_GET['width']) ){
      $width     = $_GET['width'];
  }
?>  

<div class="row">
    <div class="span6">
        <form action="" method="get">
            <h2>Thumbnail Maker</h2>
            <label for="directory">Directory</label> 
            <input type="text" name="directory" id="directory" value="<?php echo $directory; ?>"> </p>

            <label for="width">Image Width</label>
            <input type="text" name="width" id="width" value="<?php echo $width; ?>"> </p>
            
            <p>
                <button class="btn btn-primary btn-large"><i class="icon-picture icon-white"></i> Make Thumbnails</button>
            </p>
        </form>
    </div>
    <div class="span6">
        <form action="" method="get">
            <input type="hidden" name="delete" value="true">
            <h2>Delete Thumbnails Folders</h2>
            <label for="directory">Directory</label> 
            <input type="text" name="directory" id="directory" value="<?php echo $directory; ?>"> </p>
            <button class="btn btn-danger btn-large"><i class="icon-remove icon-white"></i> Delete thumbnails</button>
        </form>
    </div>
</div>

    <h4>LOG:</h4>




<?php
  $imgTypes = array('jpeg', 'jpg', 'png', 'gif'); // The extensions of Images that the plugin will read

  function createThumbs( $pathToImages, $thumbWidth ) {
    global $imgTypes;
    $pathToThumbs = $pathToImages."thumbnails/";

    // open the directory
    $dir = opendir( $pathToImages );

    if(is_dir($pathToImages) == false){
      return;
    }

    // loop through it, looking for any/all JPG files:
    while (false !== ($fname = readdir( $dir ))) {
      // parse path for the extension
      $info = pathinfo($pathToImages . $fname);
      // continue only if this is a JPEG image
      $extension = preg_split('/\./',$fname);
      $extension = strtolower($extension[count($extension)-1]);

      $arr = preg_split('/\.(?=[^.]*$)/',$fname);
      $imgName = $arr[0];
      if ($fname != "." && $fname != ".." && $fname != ".DS_Store" && is_dir($pathToImages.$fname) == false && array_search($extension,$imgTypes) !== FALSE && $imgName != "folderCover") {//If it is a folder
        echo "Creating thumbnail for {$pathToThumbs}{$fname} <br />";

        // load image and get image size
        $img = null;
        if($extension == 'jpg' || $extension == 'jpeg'){
          $img = imagecreatefromjpeg( "{$pathToImages}{$fname}" );  
        }else if($extension == 'png'){
          $img = imagecreatefrompng( "{$pathToImages}{$fname}" );  
        }else if($extension == 'gif'){
          $img = imagecreatefromgif( "{$pathToImages}{$fname}" );  
        }
        
        $width = imagesx( $img );
        $height = imagesy( $img );

        // calculate thumbnail size
        $new_width = $thumbWidth;
        $new_height = floor( $height * ( $thumbWidth / $width ) );

        // create a new temporary image
        $tmp_img = imagecreatetruecolor( $new_width, $new_height );

        // copy and resize old image into new image 
        //imagecopyresized( $tmp_img, $img, 0, 0, 0, 0, $new_width, $new_height, $width, $height ); //old bad-quality
        imagecopyresampled( $tmp_img, $img, 0, 0, 0, 0, $new_width, $new_height, $width, $height ); //ned better-quality


        if (!file_exists($pathToThumbs)) {
            //mkdir($pathToThumbs, 0755, true);
            if (mkdir($pathToThumbs, 0755, true)) chmod($pathToThumbs, 0755);
        }

        // save thumbnail into a file
        imagejpeg( $tmp_img, "{$pathToThumbs}{$fname}", 80 ); //added the ", 80" for better quality
      }else if($fname != "." && $fname != ".." && $fname != ".DS_Store" && is_dir($pathToImages.'/'.$fname) && $fname != "thumbnails" ){
        createThumbs($pathToImages.$fname.'/', $thumbWidth );
      }
    }
    // close the directory
    closedir( $dir );
  }

  function rrmdir($dir) { 
    foreach(glob($dir . '/*') as $file) { 
      if(is_dir($file)) rrmdir($file); else unlink($file); 
    } rmdir($dir); 
  }

  function deleteThumbnails( $pathToImages ) {
    global $imgTypes;

    // open the directory
    $dir = opendir( $pathToImages );

    if(is_dir($pathToImages) == false){
      return;
    }

    // loop through it, looking for any/all JPG files:
    while (false !== ($fname = readdir( $dir ))) {
      if($fname != "." && $fname != ".." && $fname != ".DS_Store" && is_dir($pathToImages.'/'.$fname) && $fname != "thumbnails" ){
          deleteThumbnails($pathToImages.$fname.'/');
      }else if( $fname == "thumbnails" && is_dir($pathToImages.'/'.$fname) ){
          echo "Deleting thumbnail folder {$pathToImages}{$fname} <br>";
          rrmdir($pathToImages.'/'.$fname);
      }
    }
    // close the directory
    closedir( $dir );
  }

  if( isset($_GET['directory']) && isset($_GET['width']) ){
      createThumbs($directory, $width);
  }

  if( isset($_GET['directory']) && isset($_GET['delete']) ){
      deleteThumbnails($directory);
  }



?>

</body>
</html>