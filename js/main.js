(function($){
    $.fn.pajinate=function(options){
        var current_page="current_page";
        var items_per_page="items_per_page";
        var meta;
        var defaults={
            item_container_id:".content",
            items_per_page:10,
            nav_panel_id:".page_navigation",
            num_page_links_to_display:20,
            start_page:0,
            nav_label_first:"First",
            nav_label_prev:"Prev",
            nav_label_next:"Next",
            nav_label_last:"Last"
        };

        var options=$.extend(defaults,options);
        var $item_container;
        var $page_container;
        var $items;
        var $nav_panels;
        return this.each(function(){
            $page_container=$(this);
            $item_container=$(this).find(options.item_container_id);
            $items=$page_container.find(options.item_container_id).children();
            meta=$page_container;
            meta.data(current_page,0);
            meta.data(items_per_page,options.items_per_page);
            var total_items=$item_container.children().size();
            var number_of_pages=Math.ceil(total_items/options.items_per_page);
            var more='<span class="ellipse more">...</span>';
            var less='<span class="ellipse less">...</span>';
            var navigation_html='<a class="first_link" href="">'+options.nav_label_first+"</a>";
            navigation_html+='<a class="previous_link" href="">'+options.nav_label_prev+"</a>"+less;
            var current_link=0;
            while(number_of_pages>current_link){
                navigation_html+='<a class="page_link" href="" longdesc="'+current_link+'">'+(current_link+1)+"</a>";
                current_link++
            }
            navigation_html+=more+'<a class="next_link" href="">'+options.nav_label_next+"</a>";
            navigation_html+='<a class="last_link" href="">'+options.nav_label_last+"</a>";
            $nav_panels=$page_container.find(options.nav_panel_id);
            $nav_panels.html(navigation_html).each(function(){
                $(this).find(".page_link:first").addClass("first");
                $(this).find(".page_link:last").addClass("last")
            });
            $nav_panels.children(".ellipse").hide();
            $nav_panels.find(".previous_link").next().next().addClass("active_page");
            $items.hide();
            $items.slice(0,meta.data(items_per_page)).show();
            var total_page_no_links=$page_container.children(options.nav_panel_id+":first").children(".page_link").size();
            options.num_page_links_to_display=Math.min(options.num_page_links_to_display,total_page_no_links);
            $nav_panels.children(".page_link").hide();
            $nav_panels.each(function(){
                $(this).children(".page_link").slice(0,options.num_page_links_to_display).show()
            });
            $page_container.find(".first_link").click(function(e){
                e.preventDefault();
                movePageNumbersRight($(this),0);
                gotoPage(0)
            });
            $page_container.find(".last_link").click(function(e){
                e.preventDefault();
                var lastPage=total_page_no_links-1;
                movePageNumbersLeft($(this),lastPage);
                gotoPage(lastPage)
            });
            $page_container.find(".previous_link").click(function(e){
                e.preventDefault();
                showPrevPage($(this))
            });
            $page_container.find(".next_link").click(function(e){
                e.preventDefault();
                showNextPage($(this))
            });
            $page_container.find(".page_link").click(function(e){
                e.preventDefault();
                gotoPage($(this).attr("longdesc"))
            });
            gotoPage(parseInt(options.start_page));
            toggleMoreLess()
        });
        function showPrevPage(e){
            new_page=parseInt(meta.data(current_page))-1;
            if($(e).siblings(".active_page").prev(".page_link").length==true){
                movePageNumbersRight(e,new_page);
                gotoPage(new_page)
            }
        }
        function showNextPage(e){
            new_page=parseInt(meta.data(current_page))+1;
            if($(e).siblings(".active_page").next(".page_link").length==true){
                movePageNumbersLeft(e,new_page);
                gotoPage(new_page)
            }
        }
        function gotoPage(page_num){
            var ipp=meta.data(items_per_page);
            var isLastPage=false;
            start_from=page_num*ipp;
            end_on=start_from+ipp;
            $items.hide().slice(start_from,end_on).show();
            $page_container.find(options.nav_panel_id).children(".page_link[longdesc="+page_num+"]").addClass("active_page").siblings(".active_page").removeClass("active_page");
            meta.data(current_page,page_num);
            toggleMoreLess()
        }
        function movePageNumbersLeft(e,new_p){
            var new_page=new_p;
            var $current_active_link=$(e).siblings(".active_page");
            if($current_active_link.siblings(".page_link[longdesc="+new_page+"]").css("display")=="none"){
                $nav_panels.each(function(){
                    $(this).children(".page_link").hide().slice(parseInt(new_page-options.num_page_links_to_display+1),new_page+1).show()
                })
            }
        }
        function movePageNumbersRight(e,new_p){
            var new_page=new_p;
            var $current_active_link=$(e).siblings(".active_page");
            if($current_active_link.siblings(".page_link[longdesc="+new_page+"]").css("display")=="none"){
                $nav_panels.each(function(){
                    $(this).children(".page_link").hide().slice(new_page,new_page+parseInt(options.num_page_links_to_display)).show()
                })
            }
        }
        function toggleMoreLess(){
            if(!$nav_panels.children(".page_link:visible").hasClass("last")){
                $nav_panels.children(".more").show()
            }else{
                $nav_panels.children(".more").hide()
            }
            if(!$nav_panels.children(".page_link:visible").hasClass("first")){
                $nav_panels.children(".less").show()
            }else{
                $nav_panels.children(".less").hide()
            }
        }
    }
})(jQuery);
/* Inicializaciè´¸n en espaå¸½ol para la extensiè´¸n 'UI date picker' para jQuery. */
/* Traducido por Vester (xvester@gmail.com). */
jQuery(function($){
    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '&#x3c;Ant',
        nextText: 'Sig&#x3e;',
        currentText: 'Hoy',
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
        'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
        'Jul','Ago','Sep','Oct','Nov','Dic'],
        dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
        dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
});
var $j = jQuery.noConflict();
var is_ie = $j.browser.msie;
var d = new Date();
var num_max_hab=5;
$j.datepicker.setDefaults($j.datepicker.regional['es']);
var $ = function (id){
    return $j('#'+id).get(0);
}
var error_o = function(id_package,id_class,id_exception,msg,action,vars)
{
    this.id_package=(!isNaN(id_package))?id_package:0;
    this.id_class=(!isNaN(id_class))?id_class:0;
    this.id_exception=(!isNaN(id_exception))?id_exception:0;
    this.action=(action!=undefined)?action:'';
    this.msg=(msg!=undefined && msg!='')?msg+"\n":'';
    this.vars = (vars!=undefined && vars!='')? vars : '';
    if(this.msg=='' && (isNaN(id_package) || !isNaN(id_class) || isNaN(id_exception)))
    {
        if(isNaN(id_package)) this.msg=id_package;
        else if(isNaN(id_class)) this.msg=id_class;
        else if(isNaN(id_exception)) this.msg=id_exception;
        if(this.msg == undefined) this.msg='';
    }
    this.getCodigoError=function()
    {
        for(i=this.id_class.length;i<3;i++) this.id_class='0'+this.id_class;
        for(i=this.id_exception.length;i<3;i++) this.id_exception='0'+this.id_exception;
        return ''+this.id_package+''+this.id_class+''+this.id_exception+'';
    }
    this.setCodigoError=function(val)
    {
        if(val.length<8) return -1;
        this.id_package=val.substr(0,2);
        this.id_class=val.substr(2,3);
        this.id_exception=val.substr(5,3);
    };
    this.setAction=function(val) {
        this.action=val;
    };
    this.setMsg=function(val) {
        this.msg=val;
    };
    this.getMsg=function() {
        return this.msg;
    };
    this.getVars=function()
    {
        var tmp = '';
        if (this.vars.length > 0) tmp = this.vars;
        return tmp;
    }
}
var Errores =  function()
{
    this.arrErrores=new Array();
    this.messages=[];
    this.text='';
    this.push=function(val) {
        this.arrErrores[this.arrErrores.length]=val;
    };
    this.toString=function()
    {
        var str=[];
        var len = this.arrErrores.length;
        for (y=0;y<len;y++)
        {
            if(this.arrErrores[y].msg=='' || this.arrErrores[y].msg.indexOf('undefined')>=0)
            {
                if (this.arrErrores[y].getVars() != '')
                    str.push(this.arrErrores[y].getCodigoError()+'_'+this.arrErrores[y].getVars());
                else str.push(this.arrErrores[y].getCodigoError());
            }else this.messages.push(this.arrErrores[y].msg);
        }
        return str.join('|');
    };
    this.eval=function(val)
    {
        if(this.arrErrores.length==0) return -1;
        var codigos=this.toString();
        if(codigos!='')
        {
            try
            {
                $j.ajax({
                    method: 'GET',
                    url:  '/wp-content/plugins/atrapalo/p.php?f=/common/error/'+codigos+'|',
                    success: function(response) {
                        if(response!='') errores.messages.push(response);
                        else errores.messages.push('Error nums: '+codigos);
                        eval(val(errores.messages.join("\n").replace(/<br\/>/g,'\n')));
                    },
                    failure: function(response) {
                        alert('Error Interno 697. Sentimos las molestias, por favor intentelo mas tarde.');
                    }
                });
            } catch(err){}
        }else{
            eval(val(this.messages));
        }
        this.clean();
    };
    this.layer=function()
    {
        this.alert();
    };
    this.alert=function()
    {
        var tmp = this.messages;
        tmp = tmp.join("\n");
        tmp = tmp.replace(/&lt;/ig,'<');
        tmp = tmp.replace(/&gt;/ig,'>');
        tmp = tmp.replace(/<br\/>/g,'\n');
        tmp = tmp.replace(/<br \/>/g,'\n');
        tmp = tmp.replace(/&aacute;/ig,'?');
        tmp = tmp.replace(/&eacute;/ig,'?');
        tmp = tmp.replace(/&oacute;/ig,'?');
        tmp = tmp.replace(/&iacute;/ig,'?');
        tmp = tmp.replace(/&uacute;/ig,'?');
        this.messages = tmp;
        if (this.messages != '') alert(this.messages);
        else alert('Error Interno 696. Sentimos las molestias, por favor intentelo mas tarde.');
        this.clean();
    };
    this.showLayer=function()
    {
        this.showAlert();
    };
    this.showAlert=function()
    {
        if(this.arrErrores.length==0) return -1;
        var codigos=this.toString();
        this.processActions();
        if(codigos!='')
        {
            try
            {
                $j.ajax({
                    method: 'GET',
                    url: '/wp-content/plugins/atrapalo/p.php?f=/common/error/'+codigos+'|',
                    success: function(response) {
                        if(response!='') errores.messages.push(response);
                        else errores.messages.push('Error nums: '+codigos);
                        return errores.alert();
                    },
                    failure: function(response) {
                        alert('Error Interno 699. Sentimos las molestias, por favor intentelo mas tarde.');
                    }
                });
            }catch(err){}
        }else return this.alert();
    };
    this.show=function()
    {
        try{
            this.showAlert();
        }catch(e){}
        this.clean();
    };
    this.hide=function() {
        $j('#lista_de_errores').html('');
    };
    this.clean=function() {
        this.arrErrores=[];
        this.messages=[];
    };
    this.cuantos=function() {
        return this.arrErrores.length;
    };
    this.close=function() {
        this.processActions();
        this.clean();
    };
    this.processActions=function()
    {
        var actions='';
        var len=this.arrErrores.length;
        for (var y=0;y<len;y++)
            if(this.arrErrores[y].action!='') actions+=this.arrErrores[y].action;
        try {
            eval(actions);
        }catch(e) {}
    };
}
var setErrorBackColor = function(obj)
{
    if (!obj.style) return;
    obj.style.backgroundColor='#FFFF75';
    obj.onchange=setGoodBackColor;
};
var setGoodBackColor = function() {
    this.style.backgroundColor='#FFF';
};
function setUpCalendar()
{
    var opt = {
        dateFormat: 'dd/mm/yy',minDate: '0',
        maxDate: '+1Y',numberOfMonths: 1,
        showAnim: '',showButtonPanel: true,
        closeText: 'cerrar',onSelect: calSelectDate
    };
    $j('#fecha_entrada').datepicker(opt);
    $j('#fecha_salida').datepicker(opt);
    $j('#salida-trigger').bind('click',function(){
        $j('#fecha_salida').datepicker('show');
        $j('#fecha_entrada').datepicker('hide');
    });
    $j('#entrada-trigger').bind('click',function(){
        $j('#fecha_entrada').datepicker('show');
        $j('#fecha_salida').datepicker('hide');
    });
}
function calSelectDate(d,obj)
{
    var dates = d.split('/');
    var year = parseInt(dates[2], 10), month = parseInt(dates[1], 10), day = parseInt(dates[0], 10);
    var nn = 1;
    var next_day=new Date(year, (month-1), (day+nn));
    var prev_day=new Date(year, (month-1), (day-nn));
    var fechaEntrada = ($('fecha_entrada').value) ? $('fecha_entrada').value.split('/'):null;
    var fechaSalida  = ($('fecha_salida').value) ? $('fecha_salida').value.split('/'):null;
    var nn_old = parseInt($('num_noches').value, 10);
    if(obj.id=="fecha_entrada")
    {
        if(fechaSalida!=null) nn=nn_old;
        next_day=new Date(year, (month-1), (day+nn));
        $j('#fecha_salida').datepicker( 'setDate' , next_day);
    }else if(obj.id=="fecha_salida")
    {
        if(fechaEntrada!=null)
        {
            var fecha_ini=new Date(parseInt(fechaEntrada[2], 10),parseInt(fechaEntrada[1], 10)-1,parseInt(fechaEntrada[0], 10));
            var fecha_fin=new Date(parseInt(fechaSalida[2], 10),parseInt(fechaSalida[1], 10)-1,parseInt(fechaSalida[0], 10));
            nn=Math.round((fecha_fin.getTime()-fecha_ini.getTime())/(1000*3600*24));
            if(fecha_ini.getTime()>=fecha_fin.getTime())
            {
                errores.push(new error_o('12','999','002'));
                errores.show();
                return;
            }
        }
        prev_day=new Date(year, (month-1), (day-nn));
        $j('#fecha_entrada').datepicker( 'setDate' , prev_day);
    }
    $('num_noches').value = nn;
    $j('#'+obj.id).datepicker( 'hide' );
}
function showCal(obj)
{
    if(obj.id=='fecha_entrada'){
        $j('#fecha_entrada').datepicker('show');
        $j('#fecha_salida').datepicker('hide');
    } else {
        $j('#fecha_salida').datepicker('show');
        $j('#fecha_entrada').datepicker('hide');
    }
}
function initBuscador()
{
    try{
        $('nombre_destino1').value = '';
        $('nombre_destino').value = '';
    }catch(err){}
    $('fecha_entrada').value = '';
    $('fecha_salida').value = '';
    $('num_habitaciones').selectedIndex = '0';
    if($('nombre_destino1'))
    {
        $j("#nombre_destino1").autocomplete({
            minLength: 2,
            delay: 0,
            select: updateAutocompletId,
            focus: null,
            source: function(request, response) {
                $j.getJSON("/wp-content/plugins/atrapalo/p.php?f=/hoteles/do_ajax/destinos_json/"+request.term,null,function(data){
                    response($j.map(data.ResultSet.Result, function(item) {
                        return {
                            label: item.text,
                            value: item.name,
                            id: item.id
                        }
                    }))
                });
            }
        });
    }
    for(k=1;k<=num_max_hab;k++)
    {
        $('num_adultos_'+k).selectedIndex = '1';
        if($('id_regimen_menu')) $('num_ninos_'+k).selectedIndex = '0';
        if($('id_regimen_menu')) for(y=1;y<=3;y++) $('edad_'+k+'_'+y).selectedIndex = '0';
    }
}
function updateAutocompletId (a,ui)
{
    if($('nombre_destino')) $('nombre_destino').value=ui.item.value;
    pais=ui.item.label.match(/\(\S+\)/)
    if($('nombre_pais')) $('nombre_pais').value=pais[0].replace("(","").replace(")","");
}
function actualizaNinos(fila)
{
    var lim = 0;
    var i=0;
    var a = $('num_adultos_'+fila);
    var n = $('num_ninos_'+fila);
    var nAd = parseInt(a[a.selectedIndex].value);
    var nNi = parseInt(n[n.selectedIndex].value);
    n.options.length = 0;
    lim = (nAd > 0) ? nAd + 1 : nAd;
    if(nAd<4) lim++;
    while ((i<lim) && ((nAd+i) <= 6))
    {
        n.options[i] = new Option(i,i);
        if (i == (nNi-0)) n.options[i].selected = true;
        i++;
    }
}
function actualizaAdultos(fila)
{
    var a = $('num_adultos_'+fila);
    var n = $('num_ninos_'+fila);
    var nNi = parseInt(n[n.selectedIndex].value);
    var nAd = parseInt(a[a.selectedIndex].value);
    if (nNi > 3)
    {
        errores.push(new error_o('12','999','001'));
        errores.show();
        n.selectedIndex = 0;
    }else{
        a.options.length=0;
        if (nNi == 0) i = 1;
        else i = nNi - 1;
        j=0;
        while ((i+nNi) <= 6)
        {
            a.options[j] = new Option(i,i);
            if (i == nAd) a.options[j].selected = true;
            j++;
            i++;
        }
    }
}
function mostrarFilasHabitaciones(cantidad)
{
    if(cantidad>1 && $('hab1')) $('hab1').style.display='block';
    else if($('hab1')) $('hab1').style.display='none';
    for(i=2;i<(num_max_hab+1);i++)
    {
        if (i<=cantidad)
        {
            if($('fila_hab_'+i+'_a')) $('fila_hab_'+i+'_a').style.display = (is_ie ? 'block' : 'table-row');
            if($('fila_hab_'+i+'_b')) $('fila_hab_'+i+'_b').style.display = (is_ie ? 'block' : 'table-row');
            if($('fila_hab_'+i+'_c')) $('fila_hab_'+i+'_c').style.display = (is_ie ? 'block' : 'table-row');
            if(!$('num_ninos_'+i).options[0].selected) $('label_edad_'+i).style.display = (is_ie ? 'block' : 'table-row');
        }else{
            if($('fila_hab_'+i+'_a')) $('fila_hab_'+i+'_a').style.display = 'none';
            if($('fila_hab_'+i+'_b')) $('fila_hab_'+i+'_b').style.display = 'none';
            if($('fila_hab_'+i+'_c')) $('fila_hab_'+i+'_c').style.display = 'none';
            $('label_edad_'+i).style.display    = 'none';
        }
    }
}
function mostrarInputsEdades(cantidad,enFila)
{
    for(i=1;i<=3;i++)
    {
        $('edad_'+enFila+'_'+i).style.display = (cantidad>=i ? '' : 'none');
    }
    if($('div_edades_'+enFila)) $('div_edades_'+enFila).style.display = (cantidad>0)?(!is_ie)? 'table-row' : 'block' : 'none';
    if($('label_edad_'+enFila)) $('label_edad_'+enFila).style.display = (cantidad>0)?(!is_ie)? 'table-row' : 'block' : 'none';
}
function comprobar()
{
    if ($('nombre_destino').value == '')
    {
        errores.push(new error_o('12','999','003','',"setErrorBackColor($('nombre_destino1'))"));
    }else if ($('fecha_entrada').value=='' || $('fecha_salida').value==''
        || $('fecha_salida').value==$('fecha_entrada').value){
        errores.push(new error_o('12','999','004',"","setErrorBackColor($('fecha_entrada'));"));
    }else{
        var fechaEntrada = $('fecha_entrada').value.split('/');
        var fechaSalida = $('fecha_salida').value.split('/');
        fecha_ini=new Date(parseInt(fechaEntrada[2], 10),parseInt(fechaEntrada[1], 10)-1,parseInt(fechaEntrada[0], 10));
        fecha_fin=new Date(parseInt(fechaSalida[2], 10),parseInt(fechaSalida[1], 10)-1,parseInt(fechaSalida[0], 10));
        $('num_noches').value=Math.round((fecha_fin.getTime()-fecha_ini.getTime())/8640000);
        if($('num_noches').value>30) {
            errores.push(new error_o('12','999','007',"","setErrorBackColor($('fecha_salida'));"));
        }
        var i = 1;
        while (i<=$('num_habitaciones')[$('num_habitaciones').selectedIndex].value)
        {
            var j = 1;
            var f = i;
            var n = $('num_ninos_'+f);
            if(n[n.selectedIndex])
            {
                while (j<=n[n.selectedIndex].value)
                {
                    if ($('edad_'+f+'_'+j).selectedIndex==0)
                        errores.push(new error_o('12','999','000',"Debe especificar la edad del niño "+j+" de la habitacion "+f,"setErrorBackColor($('edad_"+f+"_"+j+"'));"));
                    j++;
                }
            }
            i++;
        }
        if (errores.cuantos()>0){
            errores.show();
            return;
        }else{
            document.busqueda.submit();
            return;
        }
    }
    errores.show();
    return;
}
function recalcularPaxHab() {
    num_hab=$('num_habitaciones').value;
    for(i=1;i<=num_hab;i++) {
        $('num_adultos_'+i).value=$('num_adultos_1').value;
    }
    for(y=i;y<=num_max_hab;y++) {
        $('num_adultos_'+y).value=0;
    }
}
$j(document).ready(function(){
    errores = new Errores();
    setUpCalendar();
    initBuscador();
    $j('#paging_atrapalo_result').pajinate({
        items_per_page : 20,
        item_container_id : '.alt_content',
        nav_panel_id : '.alt_page_navigation',
        nav_label_first : '<<',
        nav_label_last : '>>',
        nav_label_prev : '<',
        nav_label_next : '>'

    });
});
