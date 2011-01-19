<?php

########################################################################
#  Copyright masquesoft.net  All Rights reserved
########################################################################
#
#  File          :  AtrapaloHotelesSearch
#  Creator       :  victor <victor@masquesoft.net>
#  Creation Date :  May 4, 2010
#  Description   :
#
########################################################################
#   $Author$
#   $Date$
#   $Id$
########################################################################

/**
 * Description of AtrapaloHotelesSearch
 *
 * @author victor
 */
class AtrapaloHotelesSearch {

    /**
     *
     * @var <type>
     */
    public $xml = '';
    /**
     *
     * @var <type>
     */
    public $xml_res = '';
    /**
     *
     * @var <type>
     */
    public $url_api = 'https://api.atrapalo.com/hoteles/availability';

    /**
     *
     * @param mixed $atts
     * @param mixed $vars
     * @todo rooms
     */
    public function doRequest($atts, $vars) {
        $vars['fecha_entrada'] = explode("/", $vars['fecha_entrada']);
        $vars['fecha_salida'] = explode("/", $vars['fecha_salida']);

        if($atts['api_domain']!='') $this->url_api = str_replace('atrapalo.com',$atts['api_domain'],$this->url_api);
        $this->xml = '<?xml version="1.0" encoding="utf-8"?>';
        $this->xml.='<OTA_HotelAvailRQ xmlns="http://www.opentravel.org/OTA/2003/05" 
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.atrapalo.com/api/schemas/OTA/2007B/OTA_HotelAvailRQ.xsd"
            Version="1.0" EchoToken="wp_api_atr_plug"
            Target="Prod" PrimaryLangID="' . $atts['api_pri_lang'] . '"
            AltLangID="' . $atts['api_sec_lang'] . '"
            MaxResponses="' . $atts['api_max_results'] . '">';
        $this->xml.='<POS>';
        $this->xml.='<Source>';
        $this->xml.='<RequestorID 
            MessagePassword="' . $atts['api_pass'] . '"
            Type="5" ID="' . $atts['api_user'] . '"/>';
        $this->xml.='</Source>';
        $this->xml.='</POS>';
        $this->xml.='<AvailRequestSegments>';
        $this->xml.='<AvailRequestSegment>';
        $this->xml.='<StayDateRange Start="' . $vars['fecha_entrada'][2] . '-' . $vars['fecha_entrada'][1] . '-' . $vars['fecha_entrada'][0] . '"
                                    End="' . $vars['fecha_salida'][2] . '-' . $vars['fecha_salida'][1] . '-' . $vars['fecha_salida'][0] . '"/>';
        $this->xml.='<RoomStayCandidates>';
        $this->xml.='<RoomStayCandidate Quantity="1">';
        $this->xml.='<GuestCounts>';
        $this->xml.='<GuestCount Count="2"/>';
        $this->xml.='</GuestCounts>';
        $this->xml.='</RoomStayCandidate>';
        $this->xml.='</RoomStayCandidates>';
        $this->xml.='<HotelSearchCriteria>';
        $this->xml.='<Criterion>';
        $this->xml.='<Address>';
        $this->xml.='<CityName>' . $vars['nombre_destino'] . '</CityName>';
        $this->xml.='<StateProv></StateProv>';
        $this->xml.='<CountryName>' . $vars['nombre_pais'] . '</CountryName>';
        $this->xml.='</Address>';
        $this->xml.='</Criterion>';
        $this->xml.='</HotelSearchCriteria>';
        $this->xml.='</AvailRequestSegment>';
        $this->xml.='</AvailRequestSegments>';
        $this->xml.='</OTA_HotelAvailRQ>';
    }

    /**
     *
     */
    public function sendRequest() {

        $md5 = md5($this->xml);
        $cache_file=WPATR_PLUGIN_DIR . '/cache/' . $md5 . '.cache';
        if (file_exists($cache_file)
                && time()-filemtime($cache_file)<3600) {
            $this->xml_res = file_get_contents($cache_file);
        } else {
            if (file_exists($cache_file)) unlink($cache_file);
            $curl_handle = curl_init();
            $options = array
                (
                CURLOPT_URL => $this->url_api,
                CURLOPT_HEADER => false,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_POST => false,
                CURLOPT_POSTFIELDS => $this->xml,
                CURLOPT_USERAGENT => "wp_atr_api_plugin",
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_SSL_VERIFYHOST => false,
                CURLOPT_HTTPHEADER => array(0 => 'Pragma: no-cache',
                    1 => 'Content-Type:text/xml;Accept-encode:UTF-8',
		    2 => 'Expect:' )
            );
            curl_setopt_array($curl_handle, $options);
            $this->xml_res = curl_exec($curl_handle);
            if ($this->xml_res === false) {
            }
            curl_close($curl_handle);
            file_put_contents($cache_file, $this->xml_res);
        }
    }

    /**
     * 
     */
    public function processRequest() {
        try {
            $s_xml = @new SimpleXMLElement(str_replace('xmlns', 'nsxml', $this->xml_res));
            if ($s_xml->HotelStays->HotelStay) {
                echo '<link rel="stylesheet" type="text/css" href="/wp-content/plugins/atrapalo/css/main.css"/>';
                echo '<div id="paging_atrapalo_result" class="container" >';
                echo '<div class="alt_page_navigation"></div>';
                echo '<ul class="alt_content">';
                foreach ($s_xml->HotelStays->HotelStay AS $HotelStay) {
                    $atr_BasicPropertyInfo = $HotelStay->BasicPropertyInfo->attributes();
                    $atr_Position = $HotelStay->BasicPropertyInfo->Position->attributes();
                    $HotelCode = (int) $atr_BasicPropertyInfo['HotelCode'];
                    $HotelName = (string) $atr_BasicPropertyInfo['HotelName'];
                    $CityName = (string) $HotelStay->BasicPropertyInfo->Address->CityName;
                    $StateProv = (string) $HotelStay->BasicPropertyInfo->Address->StateProv;
                    $CountryName = (string) $HotelStay->BasicPropertyInfo->Address->CountryName;
                    $Latitude = (float) $atr_Position['Latitude'];
                    $Longitude = (float) $atr_Position['Longitude'];
                    $HotelText = strip_tags((string) $HotelStay->BasicPropertyInfo->VendorMessages->VendorMessage->SubSection->Paragraph->Text);
                    $aRoomStay = $s_xml->xpath('//RoomStay[@RPH=' . $HotelCode . ']');
                    $aPhotos = $s_xml->xpath('//Photos[@PhotosRPH=' . $HotelCode . ']//PhotoUrl');
                    $aHotelAmenities = $s_xml->xpath('//HotelAmenities[@HotelAmenitiesRPH=' . $HotelCode . ']');
                    list($HotelInfoLink) = $s_xml->xpath('//HotelInfoLink[@RPH=' . $HotelCode . ']');
                    list($ReservationLink) = $s_xml->xpath('//ReservationLink[@RPH=' . $HotelCode . ']');
                    include WPATR_PLUGIN_DIR . '/xhtml/plantilla.xhtml';
                }
                echo '<div class="page_navigation"></div> ';
                echo '</ul></div>';
            } else {
                echo __("No hay resultados","atrapalo");
            }
        } catch (Exception $e) {
            echo __("No hay resultados","atrapalo");
        }
    }

}
