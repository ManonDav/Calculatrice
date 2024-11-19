/* SAE3 Calculatrice - DAVION Manon et QUESTE Arthur - groupe 2C */

var formule = "";
var stock_form = ["0","0","0","0"];

/* +-------------------+
   | Fonctions touches |
   +-------------------+ */

function Effacer(){
	var formule2 = "";
		for (let i = 0; i < formule.length-1 ; i++){
			formule2+=formule[i];
		}
		formule=formule2;
		Ecrit_form(160);
		Affiche_ancien_res();
}

function Nettoyer(){
	var canvas2 = document.getElementById("canvas");
	var ctx = canvas2.getContext("2d");
	ctx.clearRect(0,0,360,180);
	formule = "";
	stock_form = ["0","0","0","0"];
}

function Egal(){
	if (formule == "") return;
	var res = "Erreur";
	var tab = string_to_array(formule);
	if (!formule.includes("x") && is_correct(tab)) res = calcul_array(tab);
	Affiche_res(res);
}

document.addEventListener("DOMContentLoaded",Main,false);
function Main(){
	var canvas2 = document.getElementById("canvas");
	var ctx = canvas2.getContext("2d");
	ctx.font="30px consolas";
	var racine = document.body;
	var suppr = document.getElementById("suppr");
	
	suppr.addEventListener("click",Effacer,false);
	
	var del= document.getElementById("clean");
	del.addEventListener("click",Nettoyer,false);
	
	Button(racine);
	
	var egal = document.getElementById("egal");
	egal.addEventListener("click",Egal,false);
	
	var graph=document.getElementById("graphique");
	graph.addEventListener("click",Dessiner,false);
	
	var zoom=document.getElementById("z_plus");
	zoom.addEventListener("click",Zoom,false);
	
	var dezoom=document.getElementById("z_moins");
	dezoom.addEventListener("click",Dezoom,false);
	
	document.addEventListener('keydown', (event) => {
	var name = event.key;
	var code = event.code;
	var digits = "0123456789";

	if (name === "Enter"){
		event.preventDefault();
		Egal();
	}
	if (code === "Backspace"){
		Effacer();
	}
	if ((name === "=")){
		Egal();
	}
	else{
		if ((code.substr(0,6) == "Numpad") || digits.includes(name) || (name[0]=="^" && digits.includes(name[1])) || (name == ".") || (name == "x") || (name == "%") || (name=="/") || ( name == "-") || (name == "(") || (name == "-") || (name == "+") || (name == "*") || (name == ")")){	
		formule += name;
		Ecrit_form(160);
		Affiche_ancien_res();
		}
	}
	}, false);
}

function Button(n){
	n = n.firstChild;
	var m;
	while(n){
		if(n.nodeName=="BUTTON" && n.hasAttribute("name")){
			n.addEventListener("click", Formule, false);
		}else{
			m = Button(n);
			if (m !== null){
				return m;
			}
		}
	n = n.nextSibling;
	}
	return null;
}

/* +--------------------------------------+
   | Affichage du calcul et des résultats |
   +--------------------------------------+ */

function Affiche_res(res){
	var canvas2 = document.getElementById("canvas");
	var ctx = canvas2.getContext("2d");
	Ecrit_form(120);

	if (Number.isNaN(res)) ctx.fillText("Erreur",255,150);
	else
	{
		var formule2="";
		for (var j=res.toString().length-1;j>=0;j--){
			formule2+=res.toString()[j];
		}
		if (formule2.length>10){
			var tmp=(30-formule2.length).toString()+"px consolas";
			ctx.font=tmp;
		}
		for (var k=0;k<formule2.length;k++){
			ctx.fillText(formule2[k],320-k*15,150);
		}
	}
	ctx.font="30px consolas";
	Affiche_ancien_res();
	
	if (Number.isNaN(res)) stock_form.unshift(formule+" = Erreur");
	else stock_form.unshift(formule+" = "+res);
	formule = "";
}

function Affiche_ancien_res(){
	var canvas2 = document.getElementById("canvas");
	var ctx = canvas2.getContext("2d");
	 for (var i=3;i>=0;i--){
		if (stock_form[i]!=="0"){
			var formule2="";
			for (var j=(stock_form[i].toString().length)-1;j>=0;j--){
				formule2+=stock_form[i].toString()[j];
			}
			if (formule2.length<=20){
				if (formule2.length>10){
					var tmp=(30-formule2.length).toString()+"px consolas";
					ctx.font=tmp;
				}
				for (var k=0;k<formule2.length;k++){
					ctx.fillText(formule2[k],320-k*15,80-(i*40));
				}
				ctx.font="30px consolas";
			} else {
				var tab=formule2.split("=");
				if (tab[0].length>10){
					var tmp=(30-tab[0].length).toString()+"px consolas";
					ctx.font=tmp;
				}
				for (var k=0;k<tab[0].length;k++){
					ctx.fillText(tab[0][k],320-k*15,80-(i*40));
				}
				ctx.font="30px consolas";
				tab[1]= " = " +tab[1];
				if (tab[1].length>10){
					var tmp=(30-tab[0].length).toString()+"px consolas";
					ctx.font=tmp;
				}
				for (var k=0;k<tab[1].length;k++){
					ctx.fillText(tab[1][k],320-k*15,80-(i*40)-15);
				}
				ctx.font="30px consolas";
			}
		}
	 }
}

function Ecrit_form(y){
	var canvas2 = document.getElementById("canvas");
	var ctx = canvas2.getContext("2d");
	ctx.clearRect(0,0,360,180);
	
	var formule2=""
	for (var j=(formule.length)-1;j>=0;j--){
		formule2+=formule[j];
	}
	if (formule2.length<=20){
		if (formule2.length>10){
			var tmp=(30-formule2.length).toString()+"px consolas";
			ctx.font=tmp;
		}
		for (var i=0;i<formule2.length;i++){
			ctx.fillText(formule2[i],320-i*15,y);
		}
		ctx.font="30px consolas";
	}else{
		alert("Vous ne pouvez pas saisir plus de 20 caractères");
		formule=formule.substr(0,19);
		Ecrit_form(160);
	}
}

function Formule(){
	var canvas2 = document.getElementById("canvas");
	var ctx = canvas2.getContext("2d");
	formule += this.getAttribute("name");
	ctx.clearRect(0,0,360,180);
	Ecrit_form(160);
	Affiche_ancien_res();
}

/* +---------------+
   | Partie Calcul |
   +---------------+ */

function string_to_array(my_str)
{
    var tmp = "";
    var res = [];
    var operators = "+-*/%^()";
    var digits = "0123456789x";

	// cas où on commence par - avant une paranthèse
	if (my_str[0] == "-" && my_str[1] == "(") res.push(0);

    for (let i = 0; i < my_str.length; i++)
    {   
        // cas où on utilise - pour un nombre négatif et non comme un opérateur
        if (my_str[i] == "-" && digits.includes(my_str[i+1]) && my_str[i-1] != ")" &&
        (operators.includes(my_str[i-1]) || my_str[i-1] == undefined))
        tmp += my_str[i];

        else if (operators.includes(my_str[i]))
        {
            if (tmp != "")
            {
				if (tmp.includes("x")) res.push(tmp);
				else res.push(parseFloat(tmp));
                tmp = "";
            }

			// cas où on utilise la contraction "paranthèse nb" ou "nb paranthèse", on ajoute * au milieu
			if (my_str[i] == "(" && digits.includes(my_str[i-1]))
			{
				res.push("*");
				res.push(my_str[i]);
			}
			else if (my_str[i] == ")" && digits.includes(my_str[i+1]))
			{
				res.push(my_str[i]);
				res.push("*");
			}
			else res.push(my_str[i]);
        }
		else tmp += my_str[i];
    }
    if (tmp != "" && tmp.includes("x")) res.push(tmp);
	else if (tmp !="") res.push(parseFloat(tmp));
    return res;
}

function is_correct(my_array)
{
    var operators = "+-*/%^";

    // cas où le nombre de parenthèse ouvrante != nb fermante
    if (my_array.filter(function(x){return x=="("}).length != 
    my_array.filter(function(x){return x==")"}).length)
    return false;

    for (let i = 0; i < my_array.length; i++)
    {
        if (operators.includes(my_array[i]) &&   // cas problèmatique d'un opérateur
        (operators.includes(my_array[i-1]) || my_array[i-1] == undefined ||
        operators.includes(my_array[i+1]) || my_array[i+1] == undefined))
        return false;

        if (my_array[i] == "(" &&   // cas problèmatique d'une parenthèse ouvrante
        (my_array[i-1] == ")" ||
        operators.includes(my_array[i+1]) || my_array[i+1] == undefined || my_array[i+1] == ")"))
        return false;
            
        if (my_array[i] == ")" &&   // cas problèmatique d'une parenthèse fermante
        (operators.includes(my_array[i-1]) || my_array[i-1] == undefined || my_array[i-1] == "(" ||
        my_array[i+1] == "("))
        return false;
    }
    return true;
}

// Ajout du modolu mathématique à la classe Number
Number.prototype.mod = function(n) {
    return (this % n + n) % n;
}

function calcul_array(my_array)
{
    var i_start = undefined;
    var i_end = undefined;

    // On met le calcul entre parenthèses pour le calculer
    my_array.unshift("(");
    my_array.push(")");

    while (my_array.includes("("))
    {
        i_start = my_array.lastIndexOf("(");
        i_end = i_start + my_array.slice(i_start).indexOf(")");
        // On remplace le calcul entre parenthèses (paranthèses inclues) par son résultat 
		my_array.splice(i_start, i_end - i_start + 1, calcul_simple_array(my_array.slice(i_start + 1, i_end)));
    }
    return my_array[0];
}
function calcul_simple_array(my_array)
{
    var operations = [
        {"^" : function(a, b){return Math.pow(a,b)}},   // Priorité à l'exposant
        {"*" : function(a, b){return a*b},  // Puis priorité à la multiplication et la divison
         "/" : function(a, b){return a/b},
         "%" : function(a, b){return a.mod(b)}}, 
        {"+" : function(a, b){return a+b},  // Enfin priorité à l'addition et soustraction
         "-" : function(a, b){return a-b}}];

    for (let operator of operations)
    {
        for (let i = 0; i < my_array.length; i++)
        {
            if (my_array[i] in operator)
            {
                my_array[i] = operator[my_array[i]](my_array[i-1],my_array[i+1]);   // On remplace l'opérateur par le résultat
                delete my_array[i-1];   // On supprime les nombres à gauche et
                delete my_array[i+1];   // à droite de l'opérateur
                my_array = my_array.filter(function(x){return x != undefined});     // On retire les cases vides
                i--;
            }
        }
    }
    return my_array[0];
}

function remplace_x(my_array, x)
{
	var s;
	var new_array = [];
	for (let elt of my_array)
	{
		if (typeof(elt) == "string" && elt.includes("x")) 
		{
			// elt est un string contenant au moins un x, exemples : "4x", "-x2", "2xx",...
			s = 1;
			elt = elt.replaceAll("x"," x ").split(" ");
			// on aurait pu utiliser la méthode reduce
			for (let k of elt)
			{
				if (k == "-") s = -s;
				else if (k != "")
				{
					if (k == "x") s *= x;
					else s*= parseFloat(k);
				}
			}
			elt = s;
		}
		new_array.push(elt);
	}
	return new_array;
}

/* +------------------+
   | Partie Graphique |
   +------------------+ */

function draw_line(x1, y1, x2, y2)
{
    var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
}

function draw_rep(scale)
{
    var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

    // On gère le pas entre les chiffres selon l'échelle
    var step;
    if (scale >= 200) step = 0.1;
    else if (scale >= 30) step = 1;
    else if (scale >= 10) step = 5;
    else if (scale >= 4) step = 10;
    else if (scale >= 2) step = 25;
    else step = 50;

    ctx.save();
    ctx.scale(scale,scale);
    ctx.translate((canvas.width/2)*(1/scale), (canvas.height/2)*(1/scale));
    ctx.font = (scale >= 200 ? (12/scale).toString() + "px consolas" : (15/scale).toString() + "px consolas");

    ctx.beginPath();
    draw_line(-canvas.width/scale/2, 0, canvas.width/scale/2, 0);
    draw_line(0, -canvas.height/scale/2, 0, canvas.height/scale/2);
    ctx.fillText(0, -15/scale/1.3, 15/scale);
    for (let x = step; x <= canvas.width/scale/2; x += step)
    {
        // corrige l'affichage des décimaux
        x = parseFloat(x.toFixed(1));

        // abs positif
        ctx.fillText(x, x - 15/scale/2, 15/scale*1.2);
        draw_line(x, 4/scale, x, -4/scale);
        // abs négatif
        ctx.fillText(-x, -x - 15/scale, 15/scale*1.2);
        draw_line(-x, 4/scale, -x, -4/scale);
        // ord négatif
        ctx.fillText(-x, -15/scale*2.2, x + 15/scale/4);
        draw_line(-4/scale, x, 4/scale, x);
        // ord positif
        ctx.fillText(x, -15/scale*1.7, -x + 15/scale/4);
        draw_line(-4/scale, -x, 4/scale, -x);
    }
    ctx.stroke();
    ctx.restore();
}

function draw_fonction(scale, f)
{
    var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

    ctx.save();
	ctx.strokeStyle = "red";
    ctx.scale(scale,scale);
    ctx.translate((canvas.width/2)*(1/scale), (canvas.height/2)*(1/scale));

    ctx.beginPath();
    for (let x = -canvas.width; x < canvas.width; x += 0.01)
    {
        ctx.lineTo(x, -f(x));
    }
    ctx.stroke();
    ctx.restore();
}

function draw_graph(scale, f)
{
	// l'échelle est comprise entre 1 et 300

    var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1/scale;

	// dessine le repère orthonormé
    draw_rep(scale);
	// dessine la fonction
    draw_fonction(scale, f);
}

var echelle = 30;
var compteur = 5;

function Dessiner(){
	if (formule != "")
	{
		var tab = string_to_array(formule);
		if (!is_correct(string_to_array(remplace_x(tab, 1)))) Affiche_res(NaN);
		else draw_graph(echelle, function (x) {
			return calcul_array(remplace_x(tab, x));
		});
	}
}

function Zoom(){
	if (echelle < 300)
	{
		if (echelle >= 1 && echelle < 10) echelle += 1;
		else if (echelle == 180) echelle = 200;
		else echelle += compteur;
		Dessiner();
	}
}

function Dezoom(){
	if (echelle > 1)
	{
		if (echelle >= 1 && echelle <= 10) echelle -= 1;
		else if (echelle == 200) echelle = 180;
		else echelle -= compteur;
		Dessiner();
	}
}