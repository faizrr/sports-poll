interface Event {
  awayName: string
  homeName: string
  groupName: string
  country: string
  id?: number
  sport: SportTypes
  state: string
}

export enum SportTypes {
  Football = 'FOOTBALL',
  Snooker = 'SNOOKER',
  Handball = 'HANDBALL',
  IceHockey = 'ICE_HOCKEY',
  Tennis = 'TENNIS',
}

export default Event
