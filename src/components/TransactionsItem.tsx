interface TransactionsItemProps {
  date: string;
  description: string;
  type: string;
  amount: number;
  status: string;
}

function getStatusBadgeClass(status: string) {
  switch (status) {
    case 'Success':
      return 'text-bg-success';
    case 'Pending':
      return 'text-bg-warning';
    default:
      return 'text-bg-secondary';
  }
}

function TransactionsItem({
  date,
  description,
  type,
  amount,
  status,
}: TransactionsItemProps) {
  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{type}</td>
      <td className={`fw-bold ${amount < 0 ? 'text-danger' : 'text-success'}`}>
        {amount < 0 ? '-' : '+'}${Math.abs(amount).toFixed(2)}
      </td>
      <td>
        <span className={`badge rounded-pill ${getStatusBadgeClass(status)}`}>
          {status}
        </span>
      </td>
    </tr>
  );
}

export default TransactionsItem;
