export default (expenses) => expenses.reduce((acc, curr) => acc + curr.amount, 0);;
