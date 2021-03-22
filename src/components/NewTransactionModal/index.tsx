import { FormEvent, useState } from 'react'
import Modal from 'react-modal'

import { Container, TransactionTypeContainer, RadioBox } from './styles'
import close from '../../assets/close.svg'
import income from '../../assets/income.svg'
import outcome from '../../assets/outcome.svg'

import { useTransactions } from '../../hooks/useTransactions'

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal(props: NewTransactionModalProps) {
  const { createTransaction } = useTransactions()

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('deposit')

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    await createTransaction({
      title,
      amount,
      category,
      type
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
    props.onRequestClose()
  }

  return (
    <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        > 
          <button 
            type="button" 
            onClick={props.onRequestClose} 
            className="react-modal-close"
          >
            <img src={close} alt="Fechar modal" />
          </button>
          <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar transação</h2>
            <input 
              placeholder="Título"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
            <input 
              type="number" 
              placeholder="Valor" 
              value={amount}
              onChange={event => setAmount(Number(event.target.value))}
            />

            <TransactionTypeContainer>
              <RadioBox 
                type="button"
                onClick={() => setType('deposit')}
                active={type === 'deposit'}
                color="green"
              >
                <img src={income} alt="Entrada" />
                <span>Entrada</span>
              </RadioBox>
              <RadioBox 
                type="button"
                onClick={() => setType('withdraw')}
                active={type === 'withdraw'}
                color="red"
              >
                <img src={outcome} alt="Saída" />
                <span>Saída</span>
              </RadioBox>
            </TransactionTypeContainer>

            <input 
              type="text" 
              placeholder="Categoria" 
              value={category}
              onChange={event => setCategory(event.target.value)}
            />
            <button type="submit">Cadastrar</button>
          </Container>
        </Modal>
  )
}