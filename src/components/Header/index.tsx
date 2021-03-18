import { Container, Content } from './styles'
import logo from '../../assets/logo.svg';

interface HeaderProps {
  onOpenOpenNewTransactionModal: () => void;
}

export function Header({ onOpenOpenNewTransactionModal }: HeaderProps) {
    return (
      <Container>
        <Content>
          <img src={logo} alt="dt money"/>
            <button type="button" onClick={onOpenOpenNewTransactionModal}>
              Nova transação
            </button>
        </Content>
      </Container>
    )
}