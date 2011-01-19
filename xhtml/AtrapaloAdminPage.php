<div class="wrap" style="max-width:950px !important;">
    <h2>Atrapalo API Affiliates</h2>
    <div id="poststuff" style="margin-top:10px;">
        <div id="sideblock" style="float:right;width:220px;margin-left:10px;">
            <h2>Information</h2>
            <div id="dbx-content" style="text-decoration:none;">
                <img src="http://affiliates.atrapalo.com/favicon.ico" /><a style="text-decoration:none;" href="http://affiliates.atrapalo.com/"> Affiliates Atrapalo Home</a><br /><br />
                <img src="http://www.atrapalo.com/favicon.ico" /><a style="text-decoration:none;" href="http://www.atrapalo.com/"> Atrapalo.com</a><br /><br />
            </div>
        </div>
        <div id="mainblock" style="width:710px">
            <div class="dbx-content">
                <form name="AtraplaoAffiliates" action="<?php echo $action_url ?>" method="post">
                    <input type="hidden" name="submitted" value="1" />
                    <?php wp_nonce_field('atrpalo-api-nonce'); ?>
                    <h2>Usage</h2>
                    <p>Primero has de darte de alta en el programa de <a style="text-decoration:none;" href="http://affiliates.atrapalo.com/">afiliados</a> de Atrapalo.com</p>
                    <p>Segundo has de pedir acceso a la API de busqueda de hoteles.</p>
                    <p>Tercero rellenar el siguiente formulario.</p>
                    <br />
                    <h2>Api User/Pass</h2>
                    <p>Fill whith the user / pass</p>
                    <label for="api_user"> User</label><input type="text" name="api_user" value="<?php echo $atts['api_user'] ?>"/><br />
                    <label for="api_pass"> Pass</label><input type="password" name="api_pass" value="<?php echo $atts['api_pass'] ?>"/><br />
                    <br />
                    <h2>Display</h2>
                    <p>Some var about results display</p>
                    <label for="api_page"> Page with display tag ([atr_res])</label><br/>
                    <select name="api_page">
                    <?php
                    for ($i = 0; $i < count($paginasDisponibles); $i++) {
                        echo '<option value="' . $paginasDisponibles[$i]->ID . '" ';
                        echo ( $atts['api_page'] == $paginasDisponibles[$i]->ID ? 'selected="selected"':'');
                        echo '>' . $paginasDisponibles[$i]->post_title . '</option>';
                    }
                    ?>
                    </select><br />
                    <label for="api_num_results"> # Results/Page</label><br/>
                    <input type="text" name="api_num_results" value="<?php echo $atts['api_num_results'] ?>"/><br />
                    <br />
                    <label for="api_num_results"> Max # Results</label><br/>
                    <input type="text" name="api_max_results" value="<?php echo $atts['api_max_results'] ?>"/><br />
                    <br />
                    <label for="api_pri_lang"> Primary Language</label><br/>
                    <select name="api_pri_lang">
                        <option <?=$atts['api_pri_lang']=='en_EN'?'selected="selected"':''; ?>>en_EN</option>
                        <option <?=$atts['api_pri_lang']=='es_ES'?'selected="selected"':''; ?>>es_ES</option>
                        <option <?=$atts['api_pri_lang']=='fr_FR'?'selected="selected"':''; ?>>fr_FR</option>
                        <option <?=$atts['api_pri_lang']=='pt_PT'?'selected="selected"':''; ?>>pt_PT</option>
                        <option <?=$atts['api_pri_lang']=='de_DE'?'selected="selected"':''; ?>>de_DE</option>
                    </select>
                    <br />
                    <label for="api_sec_lang"> Secondary Language</label><br/>
                    <select name="api_sec_lang">
                        <option <?=$atts['api_sec_lang']=='en_EN'?'selected="selected"':''; ?>>en_EN</option>
                        <option <?=$atts['api_sec_lang']=='es_ES'?'selected="selected"':''; ?>>es_ES</option>
                        <option <?=$atts['api_sec_lang']=='fr_FR'?'selected="selected"':''; ?>>fr_FR</option>
                        <option <?=$atts['api_sec_lang']=='pt_PT'?'selected="selected"':''; ?>>pt_PT</option>
                        <option <?=$atts['api_sec_lang']=='de_DE'?'selected="selected"':''; ?>>de_DE</option>
                    </select>
                    <br />
                    <div class="submit"><input type="submit" name="Submit" value="Update" /></div>
                </form>
            </div>
        </div>
    </div>
</div>