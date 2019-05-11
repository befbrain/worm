/* global jQuery */
/* global $ */

import { Session } from 'meteor/session';

jQuery.fn.extend({
    toggleSidebarHidden: function(toggle=null) {
        let appTag = this[0];
        let isHidden = $(appTag).attr('class').split(/\s+/).includes("sidebar-hidden");
        
        if(isHidden) {
            if( toggle == null || toggle == false) {
                $(appTag).removeClass("sidebar-hidden");
            }
        } else {
            if( toggle == null || toggle == true) {
                $(appTag).addClass("sidebar-hidden");
            }
        }
    },
    toggleSidebarActive: function(toggle=null) {
        let appTag = this[0];
        let isActive = $(appTag).attr('class').split(/\s+/).includes("sidebar-active");
        if(isActive) {
            if( toggle == null || toggle == false) {
                $(appTag).removeClass("sidebar-active");
            }
        } else {
            if( toggle == null || toggle == true) {
                $(appTag).addClass("sidebar-active");
            }
        }
        
        Session.set("isSidebarActive", $(appTag).attr('class').split(/\s+/).includes("sidebar-active"));
    },
    
    initSidebar: function() {
        let sidebarItems = this.children('.sidebarItem');
        sidebarItems.each(function () {
            $(this).click(function() {
                sidebarItems.each(function() {
                    $(this).removeClass("itemActive");
                });
                $(this).addClass("itemActive");
            });
        });
    },
    
    clearSidebarItems: function() {
        $(this).empty();
    }
});