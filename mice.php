<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
     <html lang="en">
     <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
     <title>Mice</title>
     <link rel="stylesheet" href="index.css">      
     <head>
     <body>
<?php include("bar.php"); ?>     
	<style>
		body{
			overflow-y: scroll;
		}
	</style>
  	
  	<!-- Media Boxes CSS files -->
  	<link rel="stylesheet" href="plugin/components/Font Awesome/css/font-awesome.min.css"> <!-- only if you use Font Awesome -->
	<link rel="stylesheet" href="plugin/components/Fancybox/jquery.fancybox.min.css"> <!-- only if you use fancybox -->
	<link rel="stylesheet" type="text/css" href="plugin/components/Media Boxes/css/mediaBoxes.css">

     
     <div class="container-fluid text-center ">    
  <div class="row content">
    <div class="col-sm-2 sidenav">
    </div>
    <div class="col-sm-8 text-left grad"> 
      <h1>Mice</h1>
     
	<?php require_once("plugin/auto_grid.php"); ?>

	<div id="grid" auto-grid-data="<?php echo get_auto_grid_data("Gallery"); ?>"></div>

	<!-- jQuery 1.8+ -->
	<script src="plugin/components/jQuery/jquery-1.11.3.min.js"></script>
	
	<!-- Media Boxes JS files -->
	<script src="plugin/components/Isotope/jquery.isotope.min.js"></script>
	<script src="plugin/components/imagesLoaded/jquery.imagesLoaded.min.js"></script>
	<script src="plugin/components/Transit/jquery.transit.min.js"></script>
	<script src="plugin/components/jQuery Easing/jquery.easing.js"></script>
	<script src="plugin/components/Waypoints/waypoints.min.js"></script>
	<script src="plugin/components/Modernizr/modernizr.custom.min.js"></script>
	<script src="plugin/components/Fancybox/jquery.fancybox.min.js"></script> <!-- only if you use Fancybox -->
	<script src="plugin/components/Media Boxes/js/jquery.mediaBoxes.dropdown.js"></script>
	<script src="plugin/components/Media Boxes/js/jquery.mediaBoxes.js"></script>
	<script src="plugin/jquery.autoGrid.js"></script>

	<script>
      $('#grid').autoGrid(); 
	</script>
    </div>
    <div class="col-sm-2 sidenav">
    </div>
  </div>
</body>
</html>