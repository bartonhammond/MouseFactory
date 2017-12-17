    
/* ======================================================= 
 *
 *      Auto Grid
 *      Version: 2
 *      By castlecode
 *
 *      Contact: http://codecanyon.net/user/castlecode
 *      Created: March 11, 2014
 *
 *      Copyright (c) 2013, castlecode. All rights reserved.
 *      Available only in http://codecanyon.net/
 *      
 *      ---------------------------------
 *      CONTENTS
 *      ---------------------------------
 *
 *      [A] AUTO GRID CLASS
 *      [B] DEFAULTS
 *      [C] INIT
 *          [1] SETUP
 *          [2] GET FILTERS
 *          [3] ORDER THE FILTERS
 *          [4] MAKE HTML FOR FILTER
 *          [5] MAKE HTML FOR SEARCH
 *          [6] ORDER BOXES
 *          [7] BOX TEMPLATE
 *          [8] MAKE BOXES
 *          [9] INIT MEDIA BOXES
 *      [H] AUTO GRID PLUGIN
 *      
 * ======================================================= */

(function( window, $, undefined ){

/* ====================================================================== *
        [A] MEDIA BOXES CLASS
 * ====================================================================== */    

    var AutoGrid = function(container, options){
        this.init(container, options);
    }

/* ====================================================================== *
        [B] DEFAULTS
 * ====================================================================== */    
    
    AutoGrid.DEFAULTS = {

        nameDivider         : '-', // In the name, everything before this characters will not be shown
        linkTarget          : 'new_window', // 'new_window' or 'self'
        limit               : false,

        /* Thumbnails options */

        thumbnailsOrder     : 'byName', // byDate, byDateReverse, byName, byNameReverse, random
        fewThumbsFromEach   : true,
        globalRatio         : false,

        /* Filter options */

        search              : true,
        searchWord          : 'search',
        filter              : true,
        filterAll           : true,
        filterAllWord       : 'All',
        filterLayout        : 'inline', // 'inline' or 'dropdown'
        filterDefault       : 'All',
        filterDropdownEvent : 'hover', // 'hover' or 'click'
        filterOrder         : 'byName', // 'byDate', 'byDateReverse', 'byName', 'byNameReverse', 'random'

        /* Template options */

        itemTemplate        :   ' <div class="media-box-image mb-open-popup" {{link}} data-src="{{popup_src}}" data-title="{{name}}" data-type="{{popup_type}}"> '+
                                    ' <div data-thumbnail="{{thumb_src}}" {{ratio}} data-title="{{name}}" data-alt="{{name}}"></div> '+
                                    
                                    ' <div class="thumbnail-overlay"> '+

                                        ' <div class="thumbnail-overlay-animated" data-from="top"> '+
                                            ' <div class="media-box-title">{{name}}</div> '+
                                        ' </div> '+
                                        ' <div class="thumbnail-overlay-animated" data-from="bottom"> '+
                                            ' <div class="media-box-date">{{filter}}</div> '+
                                        ' </div> '+

                                    ' </div> '+
                                ' </div>',

        /* Media Boxes options */

        grid                    : {
                boxesToLoadStart                : 9,
                boxesToLoad                     : 9,
                minBoxesPerFilter               : 9,
                lazyLoad                        : true,
                lazyLoadInLoadMoreView          : false,
                horizontalSpaceBetweenBoxes     : 30,
                verticalSpaceBetweenBoxes       : 30,
                columnWidth                     : 'auto',
                columns                         : 3,
                resolutions                     :   [
                                                        {
                                                            maxWidth: 960,
                                                            columnWidth: 'auto',
                                                            columns: 3,
                                                        },
                                                        {
                                                            maxWidth: 650,
                                                            columnWidth: 'auto',
                                                            columns: 2,
                                                            horizontalSpaceBetweenBoxes: 10,
                                                            verticalSpaceBetweenBoxes: 10,
                                                        },
                                                        {
                                                            maxWidth: 450,
                                                            columnWidth: 'auto',
                                                            columns: 1,
                                                            horizontalSpaceBetweenBoxes: 10,
                                                            verticalSpaceBetweenBoxes: 10,
                                                        },
                                                    ],
                multipleFilterLogic             : 'AND',
                waitUntilThumbWithRatioLoads    : true, // When they have dimensions specified
                waitForAllThumbsNoMatterWhat    : false, // Wait for all the thumbnails to load even if they got dimensions specified
                thumbnailOverlay                : true, //Show the overlay on mouse over
                overlayEffect                   : 'fade', // 'push-up', 'push-down', 'push-up-100%', 'push-down-100%', 'reveal-top', 'reveal-bottom', 'reveal-top-100%', 'reveal-bottom-100%', 'direction-aware', 'direction-aware-fade', 'direction-right', 'direction-left', 'direction-top', 'direction-bottom', 'fade'
                overlaySpeed                    : 200,
                overlayEasing                   : 'default',
                showOnlyVisibleBoxesInPopup     : false,
                considerFilteringInPopup        : true,
                deepLinkingOnPopup              : true,
                deepLinkingOnFilter             : true,
                deepLinkingOnSearch             : false,
                LoadingWord                     : 'Loading...',
                loadMoreWord                    : 'Load More',
                noMoreEntriesWord               : 'No More Entries',
                percentage                      : false,

                popup                           : 'fancybox', // fancybox, magnificpopup, none
                magnificpopup                   :   {
                                                        gallery: true,
                                                        alignTop: false,
                                                        preload: [0,2],    
                                                    },
                fancybox                        :   {
                                                        loop                : false, // Enable infinite gallery navigation 
                                                        margin              : [44, 0], // Space around image, ignored if zoomed-in or viewport smaller than 800px
                                                        keyboard            : true, // Enable keyboard navigation
                                                        arrows              : true, // Should display navigation arrows at the screen edges
                                                        infobar             : false, // Should display infobar (counter and arrows at the top)
                                                        toolbar             : true, // Should display toolbar (buttons at the top)
                                                        buttons             :   [ // What buttons should appear in the top right corner.
                                                                                    'slideShow',
                                                                                    'fullScreen',
                                                                                    'thumbs',
                                                                                    'close'
                                                                                ],
                                                        idleTime            : 3, // Detect "idle" time in seconds
                                                        protect             : false, // Disable right-click and use simple image protection for images
                                                        animationEffect     : 'zoom', // Open/close animation type, it could be: false, 'zoom', 'fade', 'zoom-in-out'
                                                        animationDuration   : 330, // Duration in ms for open/close animation
                                                        transitionEffect    : 'fade', // ransition effect between slides, it could be: false, 'fade', 'slide', 'circular', 'tube', 'zoom-in-out', 'rotate'
                                                        transitionDuration  : 330, // Duration in ms for transition animation
                                                        slideShow           : { autoStart : false, speed : 4000 }, // slideshow settings
                                                        fullScreen          : { autoStart : false, }, // activate or deactivate fullscreen when open
                                                        thumbs              : { autoStart : false, hideOnClose : true },    // Display thumbnails on opening/closing
                                                        touch               : { vertical : true, momentum : true }, // Allow to drag content
                                                        compensateScrollbar : '.fancybox-compensate-for-scrollbar',
                                                    },                                
        },
    };    

/* ====================================================================== *
        [C] INIT
 * ====================================================================== */    

    AutoGrid.prototype.init = function(container, options){   
        
    /* ====================================================================== *
            [1] SETUP
     * ====================================================================== */

        /* SETTINGS */
        var settings                    = $.extend(true, {}, AutoGrid.DEFAULTS, options);

        /* VARS */
        var $container                  = $(container);      
        var $container_id               = $container.attr('id');
        var json_data                   = $.parseJSON($container.attr('auto-grid-data'));
        var filters                     = [];
        var filters_container           = $('<div class="auto-grid-filters-container" style="overflow:hidden;"></div>').insertBefore($container);

    /* ====================================================================== *
            [2] GET FILTERS
     * ====================================================================== */    

        // Get all different filters

        $.each(json_data, function(i, row){    
            var found   = filters.filter(function(obj){ return obj.filter === row.filter })[0];

            if(found === undefined && row.filter != ''){
                filters.push({ 'filter' : row.filter, 'filter_date' : row.directory_date, 'random' : row.random });
            }
        });

    /* ====================================================================== *
            [3] ORDER THE FILTERS
     * ====================================================================== */         

        filters     =   filters.sort(function(a, b) {
                            if(settings.filterOrder == 'byName')         return a.filter.localeCompare(b.filter); // Keep in mind that localeCompare() is case insensitive. If you want case sensitive, you can use (string1 > string2) - (string1 < string2)
                            if(settings.filterOrder == 'byNameReverse')  return b.filter.localeCompare(a.filter);
                            if(settings.filterOrder == 'byDate')         return parseFloat(b.filter_date) - parseFloat(a.filter_date);
                            if(settings.filterOrder == 'byDateReverse')  return parseFloat(a.filter_date) - parseFloat(b.filter_date);
                            if(settings.filterOrder == 'random')         return parseFloat(a.random) - parseFloat(b.random);
                        });       

    /* ====================================================================== *
            [4] MAKE HTML FOR FILTER
     * ====================================================================== */        

        // Build HTML for each filter item

        var html_filters = settings.filterAll ? ' <li><a '+ (settings.filterDefault==settings.filterAllWord ? 'class="selected"' : '') +' href="#" data-filter="*">'+settings.filterAllWord+'</a></li> ' : '';
        $.each(filters, function(i, row){        

            // Check nameDivider and remove everything before that

            var filter_name = row.filter;
            if(filter_name.indexOf(settings.nameDivider) >= 0){
                filter_name = filter_name.split(settings.nameDivider)[1];
            }

            // Add new Filter

            html_filters += '<li><a '+ (settings.filterDefault==row.filter ? 'class="selected"' : '') +' href="#" data-filter=".'+ row.filter.split(' ').join('-') +'">'+filter_name+'</a></li>';
        });

        // Build HTML container of the filters

        var html_filters_container  =   '';

        if(settings.filterLayout == 'dropdown'){
            html_filters_container  =   ' <div class="media-boxes-drop-down" data-event="'+settings.filterDropdownEvent+'"> '+
                                            ' <div class="media-boxes-drop-down-header"></div> '+
                                            ' <ul class="media-boxes-drop-down-menu auto_grid_filter_'+$container_id+'"> '+
                                                html_filters+
                                            ' </ul> '+
                                        ' </div>';
        }else if(settings.filterLayout == 'inline'){
            html_filters_container  =   ' <ul class="media-boxes-filter auto_grid_filter_'+$container_id+'"> '+
                                            html_filters+
                                        ' </ul>';
        }                                        
        
        // Place filters on the DOM

        if(settings.filter){
            //$('<div class="auto-grid-filters-container">'+html_filters_container+'</div>').insertBefore($container);
            filters_container.append(html_filters_container);
        }

    /* ====================================================================== *
            [5] MAKE HTML FOR SEARCH
     * ====================================================================== */            

        if(settings.search){
            html_search     =   ' <div class="media-boxes-search" style="float:right;">'+
                                    ' <span class="media-boxes-icon fa fa-search"></span> '+
                                    ' <input class="auto_grid_search_'+$container_id+'" type="text" id="search" placeholder="'+settings.searchWord+'"> '+
                                    ' <span class="media-boxes-clear fa fa-close"></span> '+
                                ' </div> ';

            filters_container.append(html_search);                                
        }

    /* ====================================================================== *
            [6] ORDER BOXES
     * ====================================================================== */            

        json_data   =   json_data.sort(function(a, b) {
                            if(settings.thumbnailsOrder == 'byName')         return a.name.localeCompare(b.name); // Keep in mind that localeCompare() is case insensitive. If you want case sensitive, you can use (string1 > string2) - (string1 < string2)
                            if(settings.thumbnailsOrder == 'byNameReverse')  return b.name.localeCompare(a.name);
                            if(settings.thumbnailsOrder == 'byDate')         return parseFloat(b.date) - parseFloat(a.date);
                            if(settings.thumbnailsOrder == 'byDateReverse')  return parseFloat(a.date) - parseFloat(b.date);
                            if(settings.thumbnailsOrder == 'random')         return parseFloat(a.random) - parseFloat(b.random);
                        });

        /* Few thumbnails from each directory */

        if(settings.fewThumbsFromEach){
            var new_json_data       = [];
            var filters_tmp         = filters;
            var json_data_tmp       = json_data;

            filters_tmp.unshift({ 'filter' : '' }); // add empty filter (which means targets the images that are in the root directory)

            var filter_index   = 0;
            while(json_data_tmp.length > 0){

                /* Get current filter */

                var current_filter = filters_tmp[filter_index].filter;

                /* Add new item found from current category and erase from json_data_tmp */

                $.each(json_data_tmp, function(i, row){
                    if(row.filter == current_filter){
                        new_json_data.push(row);
                        json_data_tmp.splice(i,1);

                        return false;
                    }
                });

                /* Next filter index */

                filter_index++;
                if(filter_index >= filters_tmp.length){
                    filter_index = 0;
                }
            }

            json_data = new_json_data;
        }
    
    /* ====================================================================== *
            [7] BOX TEMPLATE
     * ====================================================================== */    

        // Convert template into a box

        function convert_template(template, box){
            for (var property in box) {
                if (box.hasOwnProperty(property)) {

                    // variable and new value

                    var variable    = property;
                    var new_value   = box[property];

                    // Check nameDivider and remove everything before that

                    if((variable=='name' || variable=='filter' || variable=='extra_filter') && new_value.indexOf(settings.nameDivider) >= 0){
                        new_value = new_value.split(settings.nameDivider)[1];
                    }

                    // Check link and add Javascript for redirect
                    
                    if(variable=='link'){
                        if(settings.linkTarget == 'self'){
                            new_value = ' onclick=\'location.href="'+new_value+'"\' ';
                        }else if(settings.linkTarget == 'new_window'){
                            new_value = ' onclick=\'window.open("'+new_value+'", "_blank");\' ';
                        }
                    }

                    // Check ratio

                    if(variable=='ratio'){
                        var split   = new_value.toLowerCase().split('x');
                        new_value   = ' data-width="'+split[0]+'" data-height="'+split[1]+'" ';
                    }

                    // Remove hide_if_empty attribute if found

                    template = template.split('hide_if_empty="{{'+variable+'}}"').join('');

                    // Replace variable with value in template

                    template = template.split('{{'+variable+'}}').join(new_value);
                }
            }

            // Add global ratio

            if(settings.globalRatio != false){
                var split   = settings.globalRatio.split('x');
                template    = template.split('{{ratio}}').join( ' data-width="'+split[0]+'" data-height="'+split[1]+'" ' );
            }

            return template;
        }

    /* ====================================================================== *
            [8] MAKE BOXES
     * ====================================================================== */        

        // Limit the items

        if(settings.limit != false){
            json_data = json_data.slice(0,settings.limit);
        }

        // Iterate through all the images

        var html_boxes  = '';
        $.each(json_data, function(i, row){    

            // Vars

            var filters             = row.filter.split(' ').join('-');
            var extra_filter_arr    = row.extra_filter.split(',');

            // Add extra filters

            for (var j=0; j<extra_filter_arr.length; j++) {
                var current_extra_filter = $.trim(extra_filter_arr[j]);
                if(current_extra_filter == '')continue;
                filters += " "+ current_extra_filter.split(' ').join('-');
            };

            // Add new box

            html_boxes  +=  ' <div class="media-box '+filters+'">'+ convert_template(settings.itemTemplate, row) +'</div>';

        });

        // Add boxes to the DOM

        $container.html(html_boxes);

    /* ====================================================================== *
            [9] INIT MEDIA BOXES
     * ====================================================================== */    

        var media_boxes_extra_settings  =   {
                                                filterContainer                 : '.auto_grid_filter_'+$container_id,
                                                search                          : '.auto_grid_search_'+$container_id, // i.e. #search
                                                searchTarget                    : '.media-box-container',
                                            }

        $container.mediaBoxes( $.extend(true, {}, settings.grid, media_boxes_extra_settings) );
        
    };//END OF INIT   

/* ====================================================================== *
        [H] MEDIA BOXES PLUGIN
 * ====================================================================== */

    $.fn.autoGrid = function(options, content, callback) {

        return this.each(function(key, value){
            var $this   = $(this);
            var data    = $this.data('autoGrid')
            
            // Initialize plugin
            if (!data && typeof options != 'string'){
                $this.data('autoGrid', new AutoGrid(this, options));
            }

            // Call method
            if (data && typeof options == 'string'){
                data[options](content, callback);    
            }
        });

    };      
    
})( window, jQuery );