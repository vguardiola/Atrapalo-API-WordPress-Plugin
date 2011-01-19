<?php

########################################################################
#  Copyright masquesoft.net  All Rights reserved
########################################################################
#
#  File          :  proxy
#  Creator       :  victor <victor@masquesoft.net>
#  Creation Date :  May 6, 2010
#  Description   :
#
########################################################################
#   $Author$
#   $Date$
#   $Id$
########################################################################

$options['api_domain'] = "atrapalo.com";
if (!$_GET['f'])
    exit;
if(strpos($_SERVER['HTTP_REFERER'],$_SERVER['HTTP_HOST'])===false){
    exit;
}
$src = "http://www.".$options['api_domain'] . $_GET['f'];
$curl_handle = curl_init();
$options = array(
    CURLOPT_URL => $src,
    CURLOPT_HEADER => false,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
);
curl_setopt_array($curl_handle, $options);
echo $data = curl_exec($curl_handle);
