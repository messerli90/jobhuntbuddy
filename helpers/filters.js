import moment from 'moment'

export function filterLeads (filter, leads) {
  let filteredList = [...leads]

  // Filter status
  if (filter.status !== 'all') {
    const filtered = filteredList.filter(lead => lead.status === filter.status)
    filteredList = filtered
  }

  // Search
  if (filter.search !== '') {
    const searchList = []
    for (let i = 0; i < filteredList.length; i++) {
      if (
        (filteredList[i].companyName !== null && filteredList[i].companyName.toLowerCase().includes(filter.search)) ||
        (filteredList[i].jobTitle !== null && filteredList[i].jobTitle.toLowerCase().includes(filter.search))
      ) {
        searchList.push(filteredList[i])
      }
    }
    filteredList = searchList
  }

  return filteredList
}

export function orderLeads (order, leads) {
  const orderedList = [...leads]

  if (order === 'createdAt') {
    orderedList.sort(function (a, b) {
      const unixA = moment(a.createdAt)
      const unixB = moment(b.createdAt)
      return unixA < unixB ? -1 : 1
    })
  } else {
    orderedList.sort(function (a, b) {
      const nameA = a[order] ? a[order].toLowerCase() : 'zzz'
      const nameB = b[order] ? b[order].toLowerCase() : 'zzz'
      return nameA < nameB ? -1 : 1
    })
  }

  return orderedList
}
