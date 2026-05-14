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
      'Through the Bibles for Disciples program, nearly 600,000 Bibles have been distributed to faithful disciples through a network of indigenous partner churches. Hope Builders Ministries developed from The Calling received in Southern Africa in 1984 and the work in Malawi helped shape that vision.',
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
      'Project Timothy was begun to address the acute shortage of pastors in Mozambique. Hope Builders Ministries equips indigenous leaders with training and resources and then partners with them for the work of ministry in their communities.',
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
      'Hope Builders, in partnership with the Indigenous Church in Africa, has established 11,000 village churches with trained pastors in eight African countries since 2001. Working through local church leadership, entire congregations are being purposely discipled to maturity and the propagation of the Gospel throughout local communities.',
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
      'A clearer understanding of the Word of God is needed in Zambia. Hope Builders Ministries trains pastors and churches to make disciples who understand that the “grace of God” in Christ Jesus for eternal life is a free gift.',
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
      'Working with the Indigenous Church in Africa and Asia, Hope Builders Ministries endeavors to encourage its partners by providing Bibles, training literature, transport and Dignity Projects. Multiple thousands of training manuals have been printed and delivered to train the indigenous leaders in the Word of God.',
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
      'The HBM mission is to equip the indigenous church so local leaders can make disciples and advance the Gospel in Africa and Asia. Working through local church leadership, entire congregations are being purposely discipled to maturity and the propagation of the Gospel throughout local communities.',
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
      'HBM brings the power of Jesus Christ to Indigenous communities through disciple making. Hope Builders continues to encourage the church through on going partnerships as they work to fulfill the Great Commission.',
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
      'Hope Builders Ministries developed from The Calling received by four men working with Open Doors in Southern Africa in 1984. The local church is the best mission agency, sending out their people into the local fields that are ready to harvest.',
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
      'In 2013 Hope Builders began working with two Indigenous Missionaries in India. Along with their dedicated co-workers, they are coordinating pastor training and Disciple Making in over 4000 local churches, and there have been over 1000 new churches established through the HBM India ministry.',
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
      'HBM is also training indigenous missionaries in Pakistan. Working with the Indigenous Church in Africa and Asia, Hope Builders Ministries equips indigenous leaders with training and resources and then partners with them for the work of ministry in their communities.',
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
      'HBM is also training indigenous missionaries in Bangladesh. Hope Builders continues to encourage the church through on going partnerships as they work to fulfill the Great Commission and make disciples in their communities and beyond.',
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
