module.exports = {
	toExtensive
};

function toExtensive(date) {
	if (!date || typeof date !== 'object' || !date instanceof Date) {
		return ``;
	}

	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear().toString().padStart(4, '0');
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');

	return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}