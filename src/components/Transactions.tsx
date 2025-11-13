import TransactionsItem from './TransactionsItem';

const transactionsData = [
  {
    date: '2024-08-15',
    description: 'Booking: Meeting Room Alpha',
    type: 'Payment',
    amount: -50.0,
    status: 'Success',
  },
  {
    date: '2024-08-10',
    description: 'Booking: Co-working Space Beta',
    type: 'Payment',
    amount: -25.0,
    status: 'Success',
  },
  {
    date: '2024-08-01',
    description: 'Refund: Focus Pod Gamma (Cancellation)',
    type: 'Refund',
    amount: 15.0,
    status: 'Success',
  },
  {
    date: '2024-07-28',
    description: 'Booking: Conference Hall Delta',
    type: 'Payment',
    amount: -120.0,
    status: 'Success',
  },
  {
    date: '2024-07-25',
    description: 'Deposit to Wallet',
    type: 'Deposit',
    amount: 100.0,
    status: 'Success',
  },
  {
    date: '2024-07-20',
    description: 'Booking: Hot Desk 7',
    type: 'Payment',
    amount: -10.0,
    status: 'Success',
  },
  {
    date: '2024-07-18',
    description: 'Membership Renewal',
    type: 'Payment',
    amount: -75.0,
    status: 'Pending',
  },
];

function Transactions() {
  return (
    <>
      <h2 className="mt-5 fw-bold">Transaction Logs</h2>
      <div className="card p-4 shadow-sm">
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Type</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactionsData.map((transaction, index) => (
                <TransactionsItem
                  key={index}
                  date={transaction.date}
                  description={transaction.description}
                  type={transaction.type}
                  amount={transaction.amount}
                  status={transaction.status}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Transactions;
