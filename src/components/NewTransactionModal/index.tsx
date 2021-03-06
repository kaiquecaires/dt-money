import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useTransactions } from '../../hooks/useTransactions';
import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  const [type, setType] = useState('deposit');
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    const data = { title, amount, category, type };
    await createTransaction(data);
    clearInputs();
    onRequestClose();
  }

  function clearInputs() {
    setType('deposit');
    setAmount(0);
    setTitle('');
    setCategory('');
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" className="react-modal-close" >
        <img src={closeImg} alt="Fechar Modal" onClick={onRequestClose} />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input type="text" placeholder="Titulo" value={title} onChange={(e) => { setTitle(e.target.value) }} />
        <input type="number" placeholder="Valor" value={amount} onChange={(e) => { setAmount(Number(e.target.value)) }} />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => { setType('deposit') }}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="entrada"/>
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => { setType('withdraw') }}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="saída"/>
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input type="text" placeholder="Categoria"  value={category} onChange={(e) => { setCategory(e.target.value) }} />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
