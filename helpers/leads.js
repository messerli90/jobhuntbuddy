export const EMPTY_LEAD = {
  id: null,
  companyName: null,
  jobTitle: null,
  status: 'prospect',
  companyWebsite: null,
  listingUrl: null,
  contactName: null,
  contactEmail: null,
  sentDate: null,
  compensation: null,
  location: null,
  createdAt: new Date(),
  notes: null
}

export const STATUSES = [
  {
    key: 'prospect',
    text: 'Just a Prospect',
    classes: 'bg-yellow-200 text-yellow-800 border-yellow-500',
    baseColor: 'yellow'
  },
  {
    key: 'application-sent',
    text: 'Application Sent',
    classes: 'bg-green-200 text-green-800 border-green-500',
    baseColor: 'green'
  },
  {
    key: 'interview-set',
    text: 'Interview Set',
    classes: 'bg-blue-200 text-blue-800 border-blue-500',
    baseColor: 'blue'
  },
  {
    key: 'rejected',
    text: 'Rejected',
    classes: 'bg-red-200 text-red-800 border-red-500',
    baseColor: 'red'
  }
]
