function consultarFrete(inputId, resultadoId) {
    const cep = document.getElementById(inputId).value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert('Por favor, informe um CEP válido com 8 dígitos.');
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Erro ao buscar o CEP.');
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                document.getElementById(resultadoId).innerText = "CEP não encontrado.";
                return;
            }

            const uf = data.uf;
            const ufsFreteGratis = ["CE", "TO", "RN", "AL", "MA", "PB", "PE", "PI", "BA","SE"];

            if (ufsFreteGratis.includes(uf)) {
                document.getElementById(resultadoId).innerText = `Frete grátis disponível para ${data.localidade} - ${uf}!`;
            } else {
                document.getElementById(resultadoId).innerText = `Infelizmente não temos frete grátis para ${data.localidade} - ${uf}.`;
            }
        })
        .catch(error => {
            console.error(error);
            document.getElementById(resultadoId).innerText = "Erro ao consultar o CEP.";
        });
}
