function genCurp(param, search) {
        /**
         * filtraInconvenientes()
         * Filtra palabras altisonantes en los primeros 4 caracteres del CURP
         * @param {string} str - Los primeros 4 caracteres del CURP
         */
        function filtraInconvenientes(str) {
            var inconvenientes = ['BACA', 'LOCO', 'BUEI', 'BUEY', 'MAME', 'CACA', 'MAMO',
                'CACO', 'MEAR', 'CAGA', 'MEAS', 'CAGO', 'MEON', 'CAKA', 'MIAR', 'CAKO', 'MION',
                'COGE', 'MOCO', 'COGI', 'MOKO', 'COJA', 'MULA', 'COJE', 'MULO', 'COJI', 'NACA',
                'COJO', 'NACO', 'COLA', 'PEDA', 'CULO', 'PEDO', 'FALO', 'PENE', 'FETO', 'PIPI',
                'GETA', 'PITO', 'GUEI', 'POPO', 'GUEY', 'PUTA', 'JETA', 'PUTO', 'JOTO', 'QULO',
                'KACA', 'RATA', 'KACO', 'ROBA', 'KAGA', 'ROBE', 'KAGO', 'ROBO', 'KAKA', 'RUIN',
                'KAKO', 'SENO', 'KOGE', 'TETA', 'KOGI', 'VACA', 'KOJA', 'VAGA', 'KOJE', 'VAGO',
                'KOJI', 'VAKA', 'KOJO', 'VUEI', 'KOLA', 'VUEY', 'KULO', 'WUEI', 'LILO', 'WUEY',
                'LOCA'];

            if (inconvenientes.indexOf(str) > -1) {
                str = str.replace(/^(\w)\w/, '$1X');
            }
            return str;
        }

        /**
         * ajustaCompuesto()
         * Cuando el nombre o los apellidos son compuestos y tienen
         * proposiciones, contracciones o conjunciones, se deben eliminar esas palabras
         * a la hora de calcular el CURP.
         * @param {string} str - String donde se eliminarán las partes que lo hacen compuesto
         */
        function ajustaCompuesto(str) {
            var compuestos = [/\bDA\b/, /\bDAS\b/, /\bDE\b/, /\bDEL\b/, /\bDER\b/, /\bDI\b/,
                /\bDIE\b/, /\bDD\b/, /\bEL\b/, /\bLA\b/, /\bLOS\b/, /\bLAS\b/, /\bLE\b/,
                /\bLES\b/, /\bMAC\b/, /\bMC\b/, /\bVAN\b/, /\bVON\b/, /\bY\b/];

            compuestos.forEach(function (compuesto) {
                if (compuesto.test(str)) {
                    str = str.replace(compuesto, '');
                }
            });

            return str;
        }

        /**
         * zeropad()
         * Rellena con ceros un string, para que quede de un ancho determinado.
         * @param {number} ancho - Ancho deseado.
         * @param {number} num - Numero que sera procesado.
         */
        function zeropad(ancho, num) {
            var pad = Array.apply(0, Array.call(0, ancho)).map(function () {
                return 0;
            }).join('');

            return (pad + num).replace(new RegExp('^.*([0-9]{' + ancho + '})$'), '$1');
        }

        var pad = zeropad.bind(null, 2);

        /**
         * primerConsonante()
         * Saca la primer consonante interna del string, y la devuelve.
         * Si no hay una consonante interna, devuelve X.
         * @param {string} str - String del cual se va a sacar la primer consonante.
         */
        function primerConsonante(str) {
            str = str.trim().substring(1).replace(/[AEIOU]/ig, '').substring(0, 1);
            return (str === '') ? 'X' : str;
        }

        /**
         * filtraCaracteres()
         * Filtra convirtiendo todos los caracteres no alfabeticos a X.
         * @param {string} str - String el cual sera convertido.
         */
        function filtraCaracteres(str) {
            return str.toUpperCase().replace(/[\d_\-\.\/\\,]/g, 'X');
        }

        /**
         * estadoValido()
         * Valida si el estado esta en la lista de estados, de acuerdo a la RENAPO.
         * @param {string} str - String con el estado.
         */
        function estadoValido(str) {
            var estado = ['AS', 'BC', 'BS', 'CC', 'CS', 'CH', 'CL', 'CM', 'DF', 'DG',
                'GT', 'GR', 'HG', 'JC', 'MC', 'MN', 'MS', 'NT', 'NL', 'OC', 'PL', 'QT',
                'QR', 'SP', 'SL', 'SR', 'TC', 'TS', 'TL', 'VZ', 'YN', 'ZS', 'NE'];

            return (estado.indexOf(str.toUpperCase()) > -1);
        }

        /**
         * normalizaString()
         * Elimina los acentos, eñes y diéresis que pudiera tener el nombre.
         * @param {string} str - String con el nombre o los apellidos.
         */
        function normalizaString(str) {
            var origen, destino, salida;
            origen = ['Ã', 'À', 'Á', 'Ä', 'Â', 'È', 'É', 'Ë', 'Ê', 'Ì', 'Í', 'Ï', 'Î',
                'Ò', 'Ó', 'Ö', 'Ô', 'Ù', 'Ú', 'Ü', 'Û', 'ã', 'à', 'á', 'ä', 'â',
                'è', 'é', 'ë', 'ê', 'ì', 'í', 'ï', 'î', 'ò', 'ó', 'ö', 'ô', 'ù',
                'ú', 'ü', 'û', 'Ñ', 'ñ', 'Ç', 'ç'];
            destino = ['A', 'A', 'A', 'A', 'A', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I',
                'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'a', 'a', 'a', 'a', 'a',
                'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'o', 'o', 'o', 'o', 'u',
                'u', 'u', 'u', 'n', 'n', 'c', 'c'];
            str = str.split('');
            salida = str.map(function (char) {
                var pos = origen.indexOf(char);
                return (pos > -1) ? destino[pos] : char;
            });

            return salida.join('');
        }

        /**
         * agregaDigitoVerificador()
         * Agrega el dígito que se usa para validar el CURP.
         * @param {string} curp_str - String que contiene los primeros 17 caracteres del CURP.
         */
        function agregaDigitoVerificador(curp_str) {
            // Convierte el CURP en un arreglo
            var curp, caracteres, curpNumerico, suma, digito;

            curp = curp_str.substring(0, 17).toUpperCase().split('');
            caracteres = [
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E',
                'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
                'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            ];
            // Convierte el curp a un arreglo de números, usando la posición de cada
            // carácter, dentro del arreglo `caracteres`.
            curpNumerico = curp.map(function (caracter) {
                return caracteres.indexOf(caracter);
            });
            suma = curpNumerico.reduce(function (prev, valor, indice) {
                return prev + (valor * (18 - indice));
            }, 0);
            digito = (10 - (suma % 10));
            if (digito === 10) {
                digito = 0;
            }
            return curp_str + digito;
        }

        var inicial_nombre, vocal_apellido, posicion_1_4, posicion_14_16, curp;
        if (!estadoValido(param.estado || '__')) {
            param.estado = '__';
        }
        param.nombre = ajustaCompuesto(normalizaString(param.nombre.toUpperCase())).trim();
        param.apellido_paterno = ajustaCompuesto(normalizaString(param.apellido_paterno.toUpperCase())).trim();
        param.apellido_materno = ajustaCompuesto(normalizaString(param.apellido_materno.toUpperCase())).trim();
        // La inicial del primer nombre, o, si tiene mas de 1 nombre Y el primer
        // nombre es uno de la lista de nombres comunes, la inicial del segundo nombre
        inicial_nombre = (function (nombre) {
            var comunes, nombres, primerNombreEsComun;
            comunes = ['MARIA', 'MA', 'MA.', 'JOSE', 'J', 'J.'];
            nombres = nombre.toUpperCase().trim().split(/\s+/);
            primerNombreEsComun = (nombres.length > 1 && comunes.indexOf(nombres[0]) > -1);

            if (primerNombreEsComun) {
                return nombres[1].substring(0, 1);
            }
            if (!primerNombreEsComun) {
                return nombres[0].substring(0, 1);
            }
        }(param.nombre));
        vocal_apellido = param.apellido_paterno.trim().substring(1).replace(/[^AEIOU]/g, '').substring(0, 1);
        vocal_apellido = (vocal_apellido === '') ? 'X' : vocal_apellido;
        posicion_1_4 = [
            param.apellido_paterno.substring(0, 1),
            vocal_apellido,
            param.apellido_materno.substring(0, 1),
            inicial_nombre
        ].join('');
        posicion_1_4 = filtraInconvenientes(filtraCaracteres(posicion_1_4));
        posicion_14_16 = [
            primerConsonante(param.apellido_paterno),
            primerConsonante(param.apellido_materno),
            primerConsonante(param.nombre)
        ].join('');
        var fecha_nacimiento = ['__', '__', '__'];
        if (param.fecha_nacimiento) {
            fecha_nacimiento = $.format.date(param.fecha_nacimiento, 'yy-MM-dd').split('-');
        }
        param.sexo = param.sexo || '_';
        curp = [
            posicion_1_4,
            fecha_nacimiento[0],
            fecha_nacimiento[1],
            fecha_nacimiento[2],
            param.sexo.toUpperCase(),
            param.estado.toUpperCase(),
            posicion_14_16
        ];
        if (!param.fecha_nacimiento || search !== true) {
            curp.push('__');
            return curp.join('');
        }
        curp.push(param.homonimia || ((param.fecha_nacimiento || new Date()).getYear() > 1999 ? 'A' : 0));
        return agregaDigitoVerificador(curp.join(''));
    };