import { useEffect } from 'react'

import { api } from '../../services/api'

import { Container } from './styles'

export function TransactionTable() {
    useEffect(() => {
        api.get('transactions').then(response => console.log(response.data))
    }, [])

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Site dt.money</td>
                        <td className="deposit">R$ 12.000,00</td>
                        <td>Free Lance</td>
                        <td>12/03/2021</td>
                    </tr>
                    <tr>
                        <td>Aluguel</td>
                        <td className="withdraw">- R$ 800,00</td>
                        <td>Despesas Fixas</td>
                        <td>12/03/2021</td>
                    </tr>
                </tbody>
            </table>
        </Container>
    )
}