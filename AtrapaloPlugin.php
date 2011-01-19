<?php
/*
  Plugin Name: AtrapaloPlugin
  Plugin URI: http://www.atrapalo.com/
  Description: Plugin with widget to search bookings in Atrapalo.com.
  Author: victor.guardiola
  Version: 1.0
  Author URI: http://www.atrapalo.com/
 */
define('WPATR_VERSION', '0.1');

if (!defined('WPATR_PLUGIN_BASENAME'))
    define('WPATR_PLUGIN_BASENAME', plugin_basename(__FILE__));

if (!defined('WPATR_PLUGIN_NAME'))
    define('WPATR_PLUGIN_NAME', trim(dirname(WPATR_PLUGIN_BASENAME), '/'));

if (!defined('WPATR_PLUGIN_DIR'))
    define('WPATR_PLUGIN_DIR', WP_PLUGIN_DIR . '/' . WPATR_PLUGIN_NAME);

if (!defined('WPATR_PLUGIN_DB_OPTION'))
    define('WPATR_PLUGIN_DB_OPTION', 'AtrapaloApi_options');

class WP_Widget_BusquedaAPI extends WP_Widget {

    function WP_Widget_BusquedaAPI() {
        $widget_ops = array('description' => __('Busqueda Hoteles en Atrapalo.com', 'atrapalo'));
        $this->WP_Widget('Busqueda Atrapalo.com', __('Busqueda Atrapalo.com', 'atrapalo'), $widget_ops);
    }

    /**
     *
     * @param <type> $args
     * @param <type> $instance
     */
    function widget($args, $instance) {
        $options = $this->get_options();
        if((int)$options['api_page']) $action = get_page_link($options['api_page']);
        if($action=='') $action="/resultados/";
        include WPATR_PLUGIN_DIR . "/xhtml/widget.xhtml";
    }

    /**
     *
     * @param <type> $atts
     * @param <type> $content
     * @param <type> $code
     */
    public function embedResult($atts, $content=null, $code="") {
        require_once WPATR_PLUGIN_DIR . '/AtrapaloHotelesSearch.php';
        $req = new AtrapaloHotelesSearch();
        $req->doRequest($this->get_options(), $_POST);
        $req->sendRequest();
        $req->processRequest();
    }

    /**
     *
     */
    public function admin_menu() {
        add_options_page('Atrapalo', 'Atrapalo', 8, basename(__FILE__),
                array($this, 'handle_options'),
                "http://www.atrapalo.com/favicon.ico");
    }

    /**
     *
     * @return array
     */
    public function get_options() {
        $options = array(
            'api_user' => '',
            'api_pass' => '',
            'api_page' => '',
            'api_domain' => 'atrapalo.com',
            'api_num_results' => 20,
            'api_max_results' => 300,
            'api_pri_lang' => 'es_ES',
            'api_sec_lang' => 'en_EN'
        );

        $saved = get_option(WPATR_PLUGIN_DB_OPTION);

        if (!empty($saved)) {
            foreach ($saved as $key => $option)
                $options[$key] = $option;
        }

        if ($saved != $options) {
            update_option(WPATR_PLUGIN_DB_OPTION, $options);
        }

        return $options;
    }

    /**
     *
     */
    function install() {
        $this->get_options();
    }

    /**
     *
     */
    public function handle_options() {
        if (isset($_POST['submitted'])) {
            check_admin_referer('atrpalo-api-nonce');
            $atts = array();
            $atts['api_user'] = htmlspecialchars($_POST['api_user']);
            $atts['api_pass'] = htmlspecialchars($_POST['api_pass']);
            $atts['api_domain'] = htmlspecialchars($_POST['api_domain']);
            $atts['api_page'] = (int) $_POST['api_page'];
            $atts['api_num_results'] = (int) $_POST['api_num_results'] > 0 ? (int) $_POST['api_num_results'] : $atts['api_num_results'];
            $atts['api_max_results'] = (int) $_POST['api_max_results'] > 0 ? (int) $_POST['api_max_results'] : $atts['api_max_results'];
            $atts['api_pri_lang'] = $_POST['api_pri_lang'];
            $atts['api_sec_lang'] = $_POST['api_sec_lang'];
            update_option(WPATR_PLUGIN_DB_OPTION, $atts);
            echo '<div class="updated fade"><p>Plugin settings saved.</p></div>';
        }
        $atts = $this->get_options();
        $action_url = $_SERVER['REQUEST_URI'];
        $paginasDisponibles = get_pages();
        include(WPATR_PLUGIN_DIR . '/xhtml/AtrapaloAdminPage.php');
    }

}
//Registramos el widget
add_action('widgets_init', 'widget_BusquedaAPI_init');

/**
 * 
 */
function widget_BusquedaAPI_init() {
    register_widget('WP_Widget_BusquedaAPI');
    $AtrapaloApi = new WP_Widget_BusquedaAPI();
    add_action('admin_menu', array($AtrapaloApi, 'admin_menu'));
    add_shortcode('atr_res', array($AtrapaloApi, 'embedResult'));
}
