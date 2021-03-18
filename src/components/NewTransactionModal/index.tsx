import Modal from 'react-modal'

import { Container, TransactionTypeContainer, RadioBox } from './styles'
import close from '../../assets/close.svg'
import income from '../../assets/income.svg'
import outcome from '../../assets/outcome.svg'
import { FormEvent, useState } from 'react'
import { api } from '../../services/api'

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal(props: NewTransactionModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState(0);
  const [type, setType] = useState('deposit')

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    const data = {
      title,
      value,
      category,
      type
    }

    api.post('/transactions', data)
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
              value={value}
              onChange={event => setValue(Number(event.target.value))}
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