interface Event {
  awayName: string
  homeName: string
  group: string
  country: string
  id?: number
  sport: SportTypes
}

export enum SportTypes {
  Football = 'FOOTBALL',
  Snooker = 'SNOOKER',
  Handball = 'HANDBALL',
  IceHockey = 'ICE_HOCKEY',
  Tennis = 'TENNIS',
}

export default Event
