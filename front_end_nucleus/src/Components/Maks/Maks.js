export function maskRG(rg) {
  if (rg?.target?.value.length === undefined) {
    return formataCampo(rg, '00.000.000-0');
  }

  if (mascaraInteiro(rg) === false || rg.target.value.length > 11) {
    rg.preventDefault();
    return false;
  }
  return formataCampo(rg, '00.000.000-0');
}

export function maskCPF(cpf) {
  if (cpf?.target?.value.length === undefined) {
    return formataCampo(cpf, '000.000.000-00');
  }

  if (mascaraInteiro(cpf) === false || cpf.target.value.length > 13) {
    cpf.preventDefault();
    return false;
  }
  return formataCampo(cpf, '000.000.000-00');
}

export function maskCNPJ(cnpj) {
  if (cnpj?.target?.value.length === undefined) {
    return formataCampo(cnpj, '00.000.000/0000-00');
  }

  if (mascaraInteiro(cnpj) === false || cnpj.target.value.length > 17) {
    cnpj.preventDefault();
    return false;
  }
  return formataCampo(cnpj, '00.000.000/0000-00');
}

export function maskCEP(cep) {
  if (cep.target?.value.length === undefined) {
    return formataCampo(cep, '00.000-000');
  }

  if (mascaraInteiro(cep) === false || cep.target.value.length > 9) {
    cep.preventDefault();
    return false;
  }

  return formataCampo(cep, '00.000-000');
}

export function maskTel(tel) {
  if (tel?.target?.value.length === undefined) {
    return formataCampo(tel, '(00) 9 0000-0000');
  }

  if (mascaraInteiro(tel) === false || tel.target.value.length > 15) {
    tel.preventDefault();
    return false;
  }

  if (
    mascaraInteiro(tel) === false ||
    (tel.target.value.length >= 3 && tel.target.value.length <= 6)
  ) {
    tel.preventDefault();
    tel.target.value += 9;
  }

  return formataCampo(tel, '(00) 9 0000-0000');
}

//valida numero inteiro com mascara
function mascaraInteiro(event) {
  if (event?.charCode === undefined) {
    return false;
  }

  if (event?.charCode < 48 || event?.charCode > 57) {
    event.preventDefault();
    return false;
  }
  return true;
}

//formata de forma generica os campos
function formataCampo(campo, Mascara) {
  var boleanoMascara;

  var Digitato = undefined;

  if (campo?.charCode === undefined) {
    Digitato = 0;
  } else {
    Digitato = campo.charCode;
  }
  var exp = /\-|\.|\/|\(|\)| /g;
  var campoSoNumeros = undefined;

  if (campo?.target?.value === undefined) {
    campoSoNumeros = campo?.toString().replace(exp, '');
  } else {
    campoSoNumeros = campo.target.value.toString().replace(exp, '');
  }

  var posicaoCampo = 0;
  var NovoValorCampo = '';
  var TamanhoMascara = campoSoNumeros?.length;

  if (Digitato !== 8) {
    // backspace
    for (var i = 0; i <= TamanhoMascara; i++) {
      boleanoMascara =
        Mascara.charAt(i) === '-' ||
        Mascara.charAt(i) === '.' ||
        Mascara.charAt(i) === '/';
      boleanoMascara =
        boleanoMascara ||
        Mascara.charAt(i) === '(' ||
        Mascara.charAt(i) === ')' ||
        Mascara.charAt(i) === ' ';
      if (boleanoMascara) {
        NovoValorCampo += Mascara.charAt(i);
        TamanhoMascara++;
      } else {
        NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
        posicaoCampo++;
      }
    }
    if (campo?.target?.value === undefined) {
      return NovoValorCampo;
    } else {
      campo.target.value = NovoValorCampo;
    }
    return true;
  } else {
    return true;
  }
}
