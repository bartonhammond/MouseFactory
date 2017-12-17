<?php

/* ====================================================================== *
        GLOBAL VARIABLES
 * ====================================================================== */    
/*
    $exclude_directories 	= array('.', '..', '.DS_Store', 'thumbnails');
    $images_allowed 		= array('jpeg', 'jpg', 'png', 'gif');
    $thumbnails_folder 		= 'thumbnails';
*/
/* ====================================================================== *
        READ DIRECTORY RECURSIVELY
 * ====================================================================== */    

	function read_directory($directory, $original_directory, &$output, $config_from_file){

		//global $exclude_directories, $images_allowed, $thumbnails_folder;
        $exclude_directories        = array('.', '..', '.DS_Store', 'thumbnails');
        $images_allowed             = array('jpeg', 'jpg', 'png', 'gif');
        $thumbnails_folder          = 'thumbnails';

    /* ====================================================================== *
            CHECK IF GIVEN DIRECTORY IS AN ACTUAL DIRECTORY
     * ====================================================================== */        

        if( !is_dir($directory) ){
            return array();
        }

    /* ====================================================================== *
            ITERATE FILES/FOLDERS IN DIRECTORY
     * ====================================================================== */    

        $handler 	= opendir($directory);
        while ($file = readdir($handler)) {

        	// Exclude directories

        	if(in_array($file, $exclude_directories)) continue;

        	// If its a directory

        	if( is_dir( "$directory/$file" ) ){
        		read_directory("$directory/$file", $original_directory, $output, $config_from_file);
        	}

        	// If its a file

        	else{

        		// only images are allowed

        		$extension = preg_split('/\./',$file);
         		$extension = strtolower($extension[count($extension)-1]);
         		if( !in_array($extension, $images_allowed) ) continue;
         		
         		// create new file
                                            
     			$new_file                   = array(); 

                    // Directory/filter vars

    	        	$new_file['directory']      = $directory;
                    $new_file['directory_date'] = filemtime( $directory );
                    $new_file['filter']         = $original_directory == $directory ? '' : basename($directory);
                    $new_file['extra_filter']   = ''; // category 2, category 3

                    // Thumbnail vars

                    $new_file['thumb_src']      = file_exists( "$directory/$thumbnails_folder/$file" ) ? "$directory/$thumbnails_folder/$file" : "$directory/$file";
                    $file_pathinfo              = pathinfo( $file );
                    $new_file['name']           = $file_pathinfo['filename'];
                    $new_file['date']           = filemtime( "$directory/$file" );
                    $new_file['random']         = rand(0,9999);

                    // Popup vars

    	        	$new_file['popup_src'] 	    = "$directory/$file";

                    // Replace/Add vars from config.txt file

                    $found                      = find_img_in_array( str_replace("$original_directory/", "", $new_file['popup_src']), $config_from_file);
                    foreach ($found as $key => $value) {
                        $new_file[$key] = $value;
                    }

	        	// Add new_file to output

	            $output[] 				     = $new_file;

        	}
          
        }
  	}

/* ====================================================================== *
        FIND IMAGE IN ARRAY (FROM .TXT)
 * ====================================================================== */        

        function find_img_in_array($image, $array){
            foreach ($array as $row) {
                if($row['image'] == $image){
                    return $row;
                }
            }

            return array();
        }

/* ====================================================================== *
        GET CONFIG FROM .TXT
 * ====================================================================== */            

        function get_config_from_file($directory, $config_file_url){

            $output         = array();

            if(file_exists("$directory/$config_file_url")){
            
                $config_file    = file("$directory/$config_file_url");
                $new_obj        = array();
                
                // Iterate each line of the .txt file 
                $config_file[]  = ''; // add a break line at the end of file
                foreach ($config_file as $row) {

                    // If the line is empty add the new_obj (new_obj is the config per image)

                    if(trim($row) == ''){
                        if(count($new_obj)>0){
                            $output[]   = $new_obj;
                            $new_obj    = array();
                        }
                    }

                    // Fill the new_obj var

                    else{
                        $line                       = explode("=>", $row);
                        if(count($line)==2){
                            $new_obj[trim($line[0])]    = trim($line[1]);
                        }
                    }
                }

            }

            return $output;

        }

/* ====================================================================== *
        GET AUTO GRID DATA
 * ====================================================================== */      	

    function get_auto_grid_data($directory, $config_file_url=''){
    	
        // Output

    	$output = array();

        // Read directory

    	read_directory($directory, $directory, $output, get_config_from_file($directory, $config_file_url));	

        // Return output in json

    	return htmlspecialchars(json_encode($output)); // htmlentities vs htmlspecialchars

    }

    /*
    
        config.txt file: 

        image           => Category 1/Autumnn.jpg
        link            => https://codecanyon.net/?param=param
        extra_filter    => Category 2, Category 3
        name            => My Image Name
        thumb_src       => url
        ratio           => 1x1
        popup_src       => 

    */
?>