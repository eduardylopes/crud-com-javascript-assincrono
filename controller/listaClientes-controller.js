import { clienteService } from "../service/cliente-service.js"

const tabela = document.querySelector('[data-tabela]')

tabela.addEventListener('click', event => {
    let ehBotaoDeletar = event.target.className == 'botao-simples botao-simples--excluir'
    if( ehBotaoDeletar ) {
        try {
            const linhaCliente = event.target.closest('[data-id]')
            let id = linhaCliente.dataset.id
            clienteService.removeCliente(id)
                .then(() => linhaCliente.remove())
        } catch (erro) {
            console.log(erro)
            window.location.href = '../telas/erro.html'
        }
    }
})

const criaNovaLinha = (nome, email, id) => {
	const linhaNovoCliente = document.createElement('tr')
	const conteudo = `
        <td class="td" data-td>${nome}</td>
            <td>${email}</td>
            <td>
                <ul class="tabela__botoes-controle">
                    <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                    <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
                </ul>
            </td> 
    `
	linhaNovoCliente.innerHTML = conteudo
    linhaNovoCliente.dataset.id = id
	return linhaNovoCliente
}

const render = async () => {
    try {
        const listaClientes = await clienteService.listaClientes()
    
        listaClientes.forEach(({ nome, email, id }) => {
            tabela.appendChild(criaNovaLinha(nome, email, id))
        })
    } catch (erro) {
        console.log(erro)
        window.location.href = '../telas/erro.html'
    }
}

render()