/*
 # -- BEGIN LICENSE BLOCK ----------------------------------
 #
 # This file is part of Jimagine.
 # Toolbox for jQuery
 # Copyright (C) 2011 - 2012  Gerits Aurelien <aurelien[at]magix-dev[dot]be>
 # This program is free software: you can redistribute it and/or modify
 # it under the terms of the GNU General Public License as published by
 # the Free Software Foundation, either version 3 of the License, or
 # (at your option) any later version.
 #
 # This program is distributed in the hope that it will be useful,
 # but WITHOUT ANY WARRANTY; without even the implied warranty of
 # MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 # GNU General Public License for more details.

 # You should have received a copy of the GNU General Public License
 # along with this program.  If not, see <http://www.gnu.org/licenses/>.
 #
 # -- END LICENSE BLOCK -----------------------------------
 */
/**
 * MAGIX DEV
 * @copyright  MAGIX DEV Copyright (c) 2011 - 2012 Gerits Aurelien,
 * http://www.magix-dev.be
 * @license    Dual licensed under the MIT or GPL Version 3 licenses.
 * @version    0.1
 * @author Gérits Aurélien <aurelien[at]magix-dev[dot]be>
 * @name extmap
 */
;(function ($) {
    //Function private
    
    var methods = {
        getLatLng: function (value){
            var $this = $(this),
                position,
                zoom = value.zoom || 7,
                lat = value.lat,
                lng = value.lng,
                content = value.content || false;

            if(value.debug != false){
                console.log('Zoom %o',zoom);
                console.log('latitude %o',lat);
                console.log('longitude %o',lng);
                console.log('content %o',content);
            }
            if(lat && lng){
              position = [lat,lng];
            }
            if($.fn.gmap3 && position){
              $this.gmap3({
                  map:{
                      options:{
                          zoom: value.zoom,
                          center: position,
                          mapTypeId: google.maps.MapTypeId.ROADMAP,
                          mapTypeControl: true,
                          mapTypeControlOptions: {
                              style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                          },
                          navigationControl: true,
                          scrollwheel: true,
                          streetViewControl: true
                      }
                  },
                  marker:{
                      latLng: position,
                      options: value.markerImg ? {
                          draggable:false,
                          icon:new google.maps.MarkerImage(value.markerImg)
                      } : {
                        draggable:false
                      }
                  },
                  infowindow:{
                      options:{
                          size: new google.maps.Size(20,20),
                          content: value.content
                      }
                  }
              });
            }
        },
        getPosition:function(value){
            var $this = $(this),adress,zoom,lat,lng;
            if(typeof value.adress !== "undefined"){
                adress = value.adress;
            }
            if(typeof value.zoom !== "undefined"){
                zoom = value.zoom;
            }else{
                zoom = 7;
            }
            if(typeof value.lat !== "undefined"){
                lat = value.lat;
            }
            if(typeof value.lng !== "undefined"){
                lng = value.lng;
            }
            if($.fn.gmap3){
                if($this.length != 0){
                    if(value.debug != false){
                        console.log('Zoom %o',zoom);
                        console.log('latitude %o',lat);
                        console.log('longitude %o',lng);
                        console.log('adress %o',adress);
                    }
                    $this.gmap3({
                        clear:{name:'marker'},
                        map:{
                            address: value.adress,
                            options:{
                                zoom: value.zoom,
                                mapTypeId: google.maps.MapTypeId.ROADMAP,
                                mapTypeControl: true,
                                mapTypeControlOptions: {
                                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                                },
                                navigationControl: true,
                                scrollwheel: true,
                                streetViewControl: true
                            }
                        },
                        marker:{
                            address: value.adress,
                            options:{
                                draggable: true
                            },
                            events: {
                                dragend:function(marker){
                                    $(lat).val( marker.getPosition().lat() );
                                    $(lng).val( marker.getPosition().lng() );
                                    $(this).gmap3({
                                        //clear:{name:'marker'},
                                        getaddress:{
                                            latLng:marker.getPosition(),
                                            callback:function(results){
                                                var content, 
                                                    map = $(this).gmap3("get"),
                                                    infowindow = $(this).gmap3({get:"infowindow"}),
                                                    data = {};

                                                $.each(results[0].address_components, function (i, component) {
                                                    data[component.types[0]] = component.long_name;
                                                });
                                                content = (data.sublocality || data.locality || "") + '&nbsp;' + (data.postal_code || "") + '<br />' + (data.country || "");
                                                
                                                if (infowindow){
                                                    infowindow.open(map, marker);
                                                    infowindow.setContent(content);
                                                } else {
                                                    $(this).gmap3({
                                                        infowindow:{
                                                            anchor:marker,
                                                            options:{
                                                                size: new google.maps.Size(20,20),
                                                                content: content
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    });
                                }
                            },
                            callback:function(marker){
                                if (marker){
                                    $(lat).val( marker.getPosition().lat() );
                                    $(lng).val( marker.getPosition().lng() );
                                }
                            }
                        },
                        infowindow:{
                            options:{
                                size: new google.maps.Size(20,20),
                                content: value.adress
                            }
                        }
                    });
                }
            }
        },
        getDirection:function(value){
            var $this = $(this),btn,adress,search,direction;
            if(typeof value.adress !== "undefined"){
                adress = value.adress;
            }
            if(typeof value.button !== "undefined"){
                btn = value.button;
            }else{
                btn = false;
            }
            if(typeof value.search !== "undefined"){
                search = value.search
            }else{
                search = false;
            }
            if(typeof value.direction !== "undefined"){
                direction = value.direction;
            }else{
                direction = false;
            }
            if(typeof value.autocomplete !== "undefined"){
                autoComplete = value.autocomplete;
            }else{
                autoComplete = false;
            }
            if(value.debug != false){
                console.log('Button %o',value.button);
                console.log('Search %o',value.search);
                console.log('adress %o',value.adress);
            }
            if(autoComplete != false){
                $(search).autocomplete({
                    //This bit uses the geocoder to fetch address values
                    source: function(request, response) {
                        $this.gmap3({
                            getaddress:{
                                address: request.term,
                                callback:function(results){
                                    if (!results) return;
                                    response($.map(results, function(item) {
                                        return {
                                            label: item.formatted_address,
                                            value: item.formatted_address,
                                            latLng:item.geometry.location
                                        };
                                    }));
                                }
                            }
                        });
                    }
                });
            }
            if(btn != false){
                $(btn).on('click',function(event){
                    if(value.debug != false){
                        console.log('Event Click %o',event);
                    }
                    $(direction).empty();
                    event.stopPropagation();
                    if($(search).val().length != 0){
                        $(direction).addClass('size-direction').show(800);
                        $this.gmap3({
                            clear: {name:"getroute"},
                            getroute:{
                                options:{
                                    origin: $(search).val(),
                                    destination: adress,
                                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                                },
                                callback: function(results){
                                    if (!results) return;
                                    $(this).gmap3({
                                        directionsrenderer:{
                                            container: $(direction),
                                            options:{
                                                directions:results
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            }
        }
    },
    defaults = {
        getLatLng:{
            content: null,
            zoom:7,
            lat: false,
            lng: false,
            markerImg: false,
            debug: false
        },
        getPosition:{
            zoom:7,
            lat: false,
            lng: false,
            adress: false,
            debug: false
        },
        getDirection:{
            button: '.btn-direction',
            search: '#input-adress',
            adress: false,
            debug: false
        }
    };
    $.fn.extmap = function(options){
        var method, opts;
        for (method in options) {
            if (options.hasOwnProperty(method) && methods.hasOwnProperty(method)) {
                methods[method].call(this, $.extend(true, {}, defaults[method], options[method]));
            }
        }
    };
})(jQuery);
/**
 * mapTimer
 *
 * Example:
 * if($("#googlemap").length !=0){
        $('#getadress').keypress(function(){
            $.mapTimer({ts:'',func:'position();'});
        }).change(function(){
            $.mapTimer({ts:100,func:'position();'});
        });
    }
 */
;(function ($) {
    $.mapTimer = function(settings){
        // Default options value
        var options = {
            ts: 100,
            func:''
        };
        if ($.isPlainObject(settings)) {
            var o = $.extend(true, {}, options, settings);
        }else{
            console.log("%s: %o","helpmap.timer settings is not object");
        }
        function updateTimer(ts,func){
            if (this.timer) clearTimeout(this.timer);
            this.timer = setTimeout(func, ts ? ts : 1000);
        }
        return updateTimer(o.ts, o.func);
    }
})(jQuery);