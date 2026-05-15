export type CountryImpact = {
  id: string
  name: string
  region: 'africa' | 'asia'
  lat: number
  lng: number
  image: string
  description: string
  sourceNote?: string
  stats: {
    label: string
    value: string
  }[]
}

export const COUNTRY_IMPACTS: CountryImpact[] = [
  {
    id: 'malawi',
    name: 'Malawi',
    region: 'africa',
    lat: -13.9,
    lng: 33.7,
    image: 'https://picsum.photos/seed/hbm-stage3-malawi/900/520',
    description:
      'Through Bibles for Disciples, nearly 600,000 Bibles have reached faithful disciples through indigenous partner churches. The work in Malawi helped shape the Hope Builders vision born in Southern Africa in 1984.',
    sourceNote: 'HBM About + Our Story',
    stats: [
      { label: 'Program', value: 'Bibles for Disciples' },
      { label: 'Network', value: 'Indigenous partner churches' },
      { label: 'Focus', value: 'Faithful disciples' },
      { label: 'Region', value: 'Africa' },
    ],
  },
  {
    id: 'mozambique',
    name: 'Mozambique',
    region: 'africa',
    lat: -18.6,
    lng: 35.5,
    image: 'https://picsum.photos/seed/hbm-stage3-mozambique/900/520',
    description:
      'Project Timothy began to address the acute shortage of pastors in Mozambique. Hope Builders equips indigenous leaders with training and resources, then partners with them for ministry in their communities.',
    sourceNote: 'HBM About + Our Story',
    stats: [
      { label: 'Origin', value: 'Project Timothy' },
      { label: 'Need', value: 'Acute shortage of pastors' },
      { label: 'Method', value: 'Training and resources' },
      { label: 'Model', value: 'Indigenous leadership' },
    ],
  },
  {
    id: 'zimbabwe',
    name: 'Zimbabwe',
    region: 'africa',
    lat: -19.0,
    lng: 29.8,
    image: 'https://picsum.photos/seed/hbm-stage3-zimbabwe/900/520',
    description:
      'In partnership with the Indigenous Church in Africa, Hope Builders has helped establish 11,000 village churches with trained pastors since 2001. Through local church leadership, congregations are discipled to maturity and the Gospel spreads through their communities.',
    sourceNote: 'HBM About',
    stats: [
      { label: 'Village Churches', value: '11,000' },
      { label: 'Graduates', value: '25,000' },
      { label: 'Ministry', value: 'Disciple Makers Program' },
      { label: 'Region', value: 'Africa' },
    ],
  },
  {
    id: 'zambia',
    name: 'Zambia',
    region: 'africa',
    lat: -13.1,
    lng: 27.8,
    image: 'https://picsum.photos/seed/hbm-stage3-zambia/900/520',
    description:
      'A clearer understanding of the Word of God is needed in Zambia. Hope Builders trains pastors and churches to make disciples who understand that the grace of God in Christ Jesus for eternal life is a free gift.',
    sourceNote: 'HBM Africa / Zambia',
    stats: [
      { label: 'Need', value: 'Clearer understanding of the Word of God' },
      { label: 'Training', value: 'Pastors and churches' },
      { label: 'Message', value: 'Grace is a free gift' },
      { label: 'Goal', value: 'Make disciples' },
    ],
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    region: 'africa',
    lat: -6.3,
    lng: 34.8,
    image: 'https://picsum.photos/seed/hbm-stage3-tanzania/900/520',
    description:
      'Working with the Indigenous Church in Africa and Asia, Hope Builders encourages its partners through Bibles, training literature, transport, and Dignity Projects. Thousands of training manuals have been delivered to strengthen indigenous leaders in the Word of God.',
    sourceNote: 'HBM About',
    stats: [
      { label: 'Support', value: 'Training literature' },
      { label: 'Resources', value: 'Bibles and transport' },
      { label: 'Manuals', value: 'Thousands delivered' },
      { label: 'Focus', value: 'Word of God' },
    ],
  },
  {
    id: 'kenya',
    name: 'Kenya',
    region: 'africa',
    lat: -0.02,
    lng: 37.9,
    image: 'https://picsum.photos/seed/hbm-stage3-kenya/900/520',
    description:
      'The HBM mission is to equip the indigenous church so local leaders can make disciples and advance the Gospel in Africa and Asia. Through local church leadership, congregations are discipled to maturity and the Gospel moves through their communities.',
    sourceNote: 'HBM Three Es + About',
    stats: [
      { label: 'Mission', value: 'Equip the indigenous church' },
      { label: 'Method', value: 'Disciple making' },
      { label: 'Leadership', value: 'Local church leadership' },
      { label: 'Outcome', value: 'Advance the Gospel' },
    ],
  },
  {
    id: 'uganda',
    name: 'Uganda',
    region: 'africa',
    lat: 1.37,
    lng: 32.2,
    image: 'https://picsum.photos/seed/hbm-stage3-uganda/900/520',
    description:
      'HBM brings the power of Jesus Christ to Indigenous communities through disciple making. Hope Builders continues to encourage the church through on going partnerships as they fulfill the Great Commission.',
    sourceNote: 'HBM Three Es',
    stats: [
      { label: 'Approach', value: 'Disciple making' },
      { label: 'Partnership', value: 'On going partnerships' },
      { label: 'Mission', value: 'Fulfill the Great Commission' },
      { label: 'Community', value: 'Indigenous church' },
    ],
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    region: 'africa',
    lat: -30.5,
    lng: 22.9,
    image: 'https://picsum.photos/seed/hbm-stage3-southafrica/900/520',
    description:
      'Hope Builders Ministries developed from The Calling received by four men working with Open Doors in Southern Africa in 1984. The local church is the best mission agency, sending out their people into local fields ready to harvest.',
    sourceNote: 'HBM Our Story + Three Es',
    stats: [
      { label: 'Origin', value: 'The Calling (1984)' },
      { label: 'Region', value: 'Southern Africa' },
      { label: 'Agency', value: 'The local church' },
      { label: 'Harvest', value: 'Fields ready to harvest' },
    ],
  },
  {
    id: 'india',
    name: 'India',
    region: 'asia',
    lat: 20.5,
    lng: 78.9,
    image: 'https://picsum.photos/seed/hbm-stage3-india/900/520',
    description:
      'In 2013 Hope Builders began working with two Indigenous Missionaries in India. They are coordinating pastor training and Disciple Making in over 4000 local churches, and over 1000 new churches have been established through the HBM India ministry.',
    sourceNote: 'HBM About',
    stats: [
      { label: 'Began', value: '2013' },
      { label: 'Local Churches', value: '4,000+' },
      { label: 'New Churches', value: '1,000+' },
      { label: 'Work', value: 'Pastor training and Disciple Making' },
    ],
  },
  {
    id: 'pakistan',
    name: 'Pakistan',
    region: 'asia',
    lat: 30.3,
    lng: 69.3,
    image: 'https://picsum.photos/seed/hbm-stage3-pakistan/900/520',
    description:
      'HBM is also training indigenous missionaries in Pakistan. Working with the Indigenous Church in Africa and Asia, Hope Builders equips indigenous leaders with training and resources, then partners with them for ministry in their communities.',
    sourceNote: 'HBM About',
    stats: [
      { label: 'Training', value: 'Indigenous missionaries' },
      { label: 'Model', value: 'Training and resources' },
      { label: 'Partnership', value: 'Work of ministry' },
      { label: 'Region', value: 'Asia' },
    ],
  },
  {
    id: 'bangladesh',
    name: 'Bangladesh',
    region: 'asia',
    lat: 23.6,
    lng: 90.3,
    image: 'https://picsum.photos/seed/hbm-stage3-bangladesh/900/520',
    description:
      'HBM is also training indigenous missionaries in Bangladesh. Hope Builders encourages the church through on going partnerships as they fulfill the Great Commission and make disciples in their communities and beyond.',
    sourceNote: 'HBM About + Three Es + Our Story',
    stats: [
      { label: 'Training', value: 'Indigenous missionaries' },
      { label: 'Partnership', value: 'On going partnerships' },
      { label: 'Mission', value: 'Fulfill the Great Commission' },
      { label: 'Focus', value: 'Make disciples' },
    ],
  },
]

export const COUNTRY_IMPACT_MAP = Object.fromEntries(
  COUNTRY_IMPACTS.map((country) => [country.id, country])
) as Record<string, CountryImpact>
