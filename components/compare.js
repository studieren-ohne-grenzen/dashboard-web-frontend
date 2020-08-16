const compareByName = (a, b) => {
  const nameA = a.name.toUpperCase()
  const nameB = b.name.toUpperCase()
  if (nameA > nameB) return 1
  if (nameB > nameA) return -1
  else return 0
}

module.exports = compareByName
