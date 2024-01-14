export const formatDate = (dateObject: Date) => {
  return dateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })
}