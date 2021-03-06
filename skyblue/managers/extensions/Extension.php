<?php defined('SKYBLUE') or die('Bad file request');

/**
 * @version      2.0 2009-12-27 11:15:00 $
 * @package      SkyBlueCanvas
 * @copyright    Copyright (C) 2005 - 2010 Scott Edwin Lewis. All rights reserved.
 * @license      GNU/GPL, see COPYING.txt
 * SkyBlueCanvas is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 * See COPYING.txt for copyright notices and details.
 */

/**
 * @author Scott Lewis
 * @date   December 27, 2009
 */

class Extension extends TransferObject {
    
    var $id;
    var $name;
    var $content;
    var $context;
    var $type    = 'extensions';
    var $objtype = 'extensions';
    
    function getName() {
        return $this->name;
    }
    
    function setName($name) {
        $this->name = $name;
    }
    
    function getContext() {
        return $this->context;
    }
    
    function setContext($context) {
        $this->context = $context;
    }
    
    function getContent() {
        return $this->content;
    }
    
    function setContent($content) {
        $this->content = $content;
    }
}