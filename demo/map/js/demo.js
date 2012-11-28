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
 * @name demo
 */
//Nom de la société (pour la bulle)
var society = 'ma société';
//adresse
var address = 'Place Saint Lambert';
//Ville
var city = 'Liège';
//pays
var country = 'belgique';
function init(){
    $('#googlemap').jmMap({
        getLatLng:{
            content: '<strong>'+society+'</strong>'+'<br />'+address+'<br />'+city+'<br />',
            zoom:14,
            lat: 50.64565,
            lng: 5.5730678,
            markerImg:'markers/blue-dot.png'
        }
    });
}
function direction(){
    $('#googlemap').jmMap({
        getDirection:{
            button: '.subdirection',
            search: '#getaddress',
            address: address+' '+city+','+country,
            direction: '#r-directions',
            autocomplete:true
        }
    });
}
function position(){
    $('#googlemap').jmMap({
        getPosition:{
            zoom:14,
            lat: '#lat',
            lng: '#lng',
            address: $('#getaddress').val(),
            debug: false
        }
    });
}
$(function(){
    init();
    if($('.map-direction').length != 0){
        direction();
    }else if($('.map-position').length != 0){
        if($("#googlemap").length !=0){
            $('#getaddress').keypress(function(){
                $.mapTimer({ts:'',func:'position();'});
            }).change(function(){
                $.mapTimer({ts:100,func:'position();'});
            });
        }
    }
});