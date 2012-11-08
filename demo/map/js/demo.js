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
var adress = 'Place Saint Lambert';
//Ville
var city = 'Liège';
//pays
var country = 'belgique';
function initMap(){
    //Configuration
    var setconfig = {
        latitude : 50.64565,
        longitude : 5.5730678,
        zoom : 14,
        content: '<strong>'+society+'</strong>'+'<br />'+adress+'<br />'+city+'<br />'
    };
    var setoptions = {
        markerPath : 'markers/',
        markerImg : 'red'
    };
    jm_map.latLng('#googlemap',setconfig,setoptions,false);
}
function direction(){
    initMap();
    jm_map.autocomplete('#getadress','#googlemap');
    var setconfig = {
        adress: adress+' '+city+','+country,
        eventclick: '.subdirection',
        direction:'#r-directions',
        inputext:'#getadress'
    };
    jm_map.getDirection('#googlemap',setconfig,false);
}
function position(){
    var configPosition = {
        adress: $('#getadress').val(),
        latitude : '#lat',
        longitude : '#lng',
        zoom : 14
    };
    jm_map.adressPosition('#googlemap',configPosition,false);
}
$(function(){
    if($('.map-direction').length != 0){
        direction();
    }else if($('.map-position').length != 0){
        initMap();
        if($("#googlemap").length !=0){
            $('#getadress').keypress(function(){
                jm_map.updateTimer('','position();');
            }).change(function(){
                jm_map.updateTimer(100,'position();');
            });
        }
    }
});