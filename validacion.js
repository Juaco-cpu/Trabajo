document.getElementById('form-registro').addEventListener('submit', function(event) {
    event.preventDefault(); 
    if (validar()) {
        window.location.href = 'destino.html';
    }
});

function validar() {
    var retorno_comuna = validar_comuna();
    var retorno_contra = validar_contra();
    var retorno_nombre = validar_nombre();
    var retorno_fono = validar_fono();
    var retorno_direccion = validar_direccion();
    var retorno_url = validar_URL();
    var retorno_aficiones = validar_aficiones();

    return retorno_comuna && retorno_contra && retorno_nombre && retorno_fono && retorno_direccion && retorno_url && retorno_aficiones;
}

function validar_nombre() {
    var input_nombre = document.getElementById("input-nombre");
    var div_error_nombre = document.getElementById("error-nombre");
    var nombre = input_nombre.value;
    var primer_caracter = nombre.charAt(0);
    var longitud_valida = nombre.length >= 5 && nombre.length <= 10;
    var solo_letras = (primer_caracter >= 'a' && primer_caracter <= 'z') || (primer_caracter >= 'A' && primer_caracter <= 'Z');

    div_error_nombre.innerHTML = "";

    if (nombre === "") {
        div_error_nombre.innerHTML = "El nombre de usuario es obligatorio";
        return false;
    } else if (!longitud_valida) {
        div_error_nombre.innerHTML = "El nombre debe tener entre 5 y 10 caracteres";
        return false;
    } else if (!solo_letras) {
        div_error_nombre.innerHTML = "El nombre debe comenzar con una letra";
        return false;
    } else {
        for (var i = 0; i < nombre.length; i++) {
            var char = nombre.charAt(i);
            if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9'))) {
                div_error_nombre.innerHTML = "El nombre solo puede contener letras y números, sin caracteres especiales";
                return false;
            }
        }
        for (var i = 0; i < nombre.length - 1; i++) {
            var char = nombre.charAt(i);
            if (char >= '0' && char <= '9') {
                div_error_nombre.innerHTML = "Los números solo pueden estar al final del nombre";
                return false;
            }
        }
    }

    return true;
}

function validar_contra() {
    var input_contra = document.getElementById("input-password");
    var div_error_contra = document.getElementById("error-password");
    var contra = input_contra.value;
    var confirmacion = document.getElementById("input-confirmacion").value;
    var div_error_confirmacion = document.getElementById("error-confirmacion");
    var nom = document.getElementById("input-nombre").value;
    var tiene_letra = false;
    var tiene_digito = false;

    div_error_contra.innerHTML = "";
    div_error_confirmacion.innerHTML = "";

    if (contra === "") {
        div_error_contra.innerHTML = "La contraseña es obligatoria";
        return false;
    } else if (contra.length < 3 || contra.length > 6) {
        div_error_contra.innerHTML = "La contraseña debe tener entre 3 y 6 caracteres";
        return false;
    } else if (contra.includes(nom)) {
        div_error_contra.innerHTML = "La contraseña no puede contener el nombre de usuario";
        return false;
    }

    for (var i = 0; i < contra.length; i++) {
        var char = contra.charAt(i);
        if (char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z') {
            tiene_letra = true;
        } else if (char >= '0' && char <= '9') {
            tiene_digito = true;
        }
    }

    if (!tiene_letra || !tiene_digito) {
        div_error_contra.innerHTML = "La contraseña debe contener al menos una letra y un dígito";
        return false;
    } else if (contra !== confirmacion) {
        div_error_contra.innerHTML = "Las contraseñas no coinciden";
        div_error_confirmacion.innerHTML = "Las contraseñas no coinciden";
        return false;
    }

    return true;
}

function validar_comuna() {
    var select_comuna = document.getElementById("select-comuna");
    var div_error_comuna = document.getElementById("error-comuna");
    var comuna = select_comuna.value;

    div_error_comuna.innerHTML = "";

    if (comuna === "default") {
        div_error_comuna.innerHTML = "Debe seleccionar una comuna";
        return false;
    }

    return true;
}

function validar_fono() {
    var input_fono = document.getElementById("input-fono");
    var div_error_fono = document.getElementById("error-fono");
    var fono = input_fono.value;

    div_error_fono.innerHTML = "";

    if (fono === "") {
        div_error_fono.innerHTML = "El teléfono es obligatorio";
        return false;
    } else if (!fono.startsWith("+")) {
        div_error_fono.innerHTML = "El número de teléfono debe comenzar con '+'";
        return false;
    } else if (isNaN(fono.slice(1).replace(/\s/g, ""))) {
        div_error_fono.innerHTML = "El número de teléfono debe contener solo números después del '+'";
        return false;
    } else if (fono.length < 12 || fono.length > 16) {
        div_error_fono.innerHTML = "El número de teléfono debe tener entre 12 y 16 caracteres";
        return false;
    }
    
    return true;
}

function validar_direccion() {
    var input_direccion = document.getElementById("input-direccion");
    var div_error_direccion = document.getElementById("error-direccion");
    var direccion = input_direccion.value;

    div_error_direccion.innerHTML = "";

    if (direccion === "") {
        div_error_direccion.innerHTML = "Ingrese su dirección";
        return false;
    }

    return true;
}

function validar_URL() {
    var input_url = document.getElementById("input-url");
    var div_error_url = document.getElementById("error-url");
    var url = input_url.value;

    div_error_url.innerHTML = "";

    // Verifica si la URL no está vacía
    if (url.trim() === "") {
        div_error_url.innerHTML = "La URL es obligatoria";
        return false; // La URL está vacía, por lo tanto, es inválida
    }

    // Verifica si la URL tiene el formato correcto
    if (url.indexOf("://") > 0 && url.lastIndexOf(".") > url.indexOf("://")) {
        return true; // La URL tiene el formato correcto
    } else {
        div_error_url.innerHTML = "La URL no tiene el formato correcto";
        return false; // La URL no tiene el formato correcto
    }
}


function validar_aficiones() {
    var lista_aficiones = document.getElementById("lista-aficiones");
    var div_error_aficiones = document.getElementById("error-aficiones");

    div_error_aficiones.innerHTML = "";

    if (lista_aficiones.getElementsByTagName("li").length < 2) {
        div_error_aficiones.innerHTML = "Debe ingresar al menos 2 aficiones";
        return false;
    }

    return true;
}

function agregarAficion() {
    var input_aficiones = document.getElementById("input-aficiones");
    var aficion = input_aficiones.value;
    var lista_aficiones = document.getElementById("lista-aficiones");
    var div_error_aficiones = document.getElementById("error-aficiones");

    if (aficion.trim() === "") {
        div_error_aficiones.innerHTML = "Ingrese una afición";
        div_error_aficiones.className = "text-danger small mt-1";
        return;
    }

    var nueva_aficion = document.createElement("li");
    nueva_aficion.className = "list-group-item";
    nueva_aficion.textContent = aficion;
    lista_aficiones.appendChild(nueva_aficion);
    input_aficiones.value = "";
    div_error_aficiones.innerHTML = "";
}