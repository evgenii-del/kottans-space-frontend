// Start from here

if (module.not) {
  module.not.accept();
}

window.data = {
  rockets: [
    {
      height: {
        meters: 22.25,
        feet: 73,
      },
      diameter: {
        meters: 1.68,
        feet: 5.5,
      },
      mass: {
        kg: 30146,
        lb: 66460,
      },
      first_stage: {
        thrust_sea_level: {
          kN: 420,
          lbf: 94000,
        },
        thrust_vacuum: {
          kN: 480,
          lbf: 110000,
        },
        reusable: false,
        engines: 1,
        fuel_amount_tons: 44.3,
        burn_time_sec: 169,
      },
      second_stage: {
        thrust: {
          kN: 31,
          lbf: 7000,
        },
        payloads: {
          composite_fairing: {
            height: {
              meters: 3.5,
              feet: 11.5,
            },
            diameter: {
              meters: 1.5,
              feet: 4.9,
            },
          },
          option_1: 'composite fairing',
        },
        reusable: false,
        engines: 1,
        fuel_amount_tons: 3.38,
        burn_time_sec: 378,
      },
      engines: {
        isp: {
          sea_level: 267,
          vacuum: 304,
        },
        thrust_sea_level: {
          kN: 420,
          lbf: 94000,
        },
        thrust_vacuum: {
          kN: 480,
          lbf: 110000,
        },
        number: 1,
        type: 'merlin',
        version: '1C',
        layout: 'single',
        engine_loss_max: 0,
        propellant_1: 'liquid oxygen',
        propellant_2: 'RP-1 kerosene',
        thrust_to_weight: 96,
      },
      landing_legs: {
        number: 0,
        material: null,
      },
      payload_weights: [
        {
          id: 'leo',
          name: 'Low Earth Orbit',
          kg: 450,
          lb: 992,
        },
      ],
      flickr_images: ['https://imgur.com/DaCfMsj.jpg', 'https://imgur.com/azYafd8.jpg'],
      name: 'Falcon 1',
      type: 'rocket',
      active: false,
      stages: 2,
      boosters: 0,
      cost_per_launch: 6700000,
      success_rate_pct: 40,
      first_flight: '2006-03-24',
      country: 'Republic of the Marshall Islands',
      company: 'SpaceX',
      wikipedia: 'https://en.wikipedia.org/wiki/Falcon_1',
      description:
        'The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.',
      id: '5e9d0d95eda69955f709d1eb',
    },
  ],
  missions: [
    {
      mission_name: 'Iridium NEXT',
      mission_id: 'F3364BF',
      manufacturers: ['Orbital ATK'],
      payload_ids: [
        'Iridium NEXT 1',
        'Iridium NEXT 2',
        'Iridium NEXT 3',
        'Iridium NEXT 4',
        'Iridium NEXT 5',
        'Iridium NEXT 6',
        'Iridium NEXT 7',
      ],
      wikipedia: 'https://en.wikipedia.org/wiki/Iridium_satellite_constellation',
      website: 'https://www.iridiumnext.com/',
      twitter: 'https://twitter.com/IridiumBoss?lang=en',
      description:
        "In 2017, Iridium began launching Iridium NEXT, a second-generation worldwide network of telecommunications satellites, consisting of 66 active satellites, with another nine in-orbit spares and six on-ground spares. These satellites will incorporate features such as data transmission that were not emphasized in the original design. The constellation will provide L-band data speeds of up to 128 kbit/s to mobile terminals, up to 1.5 Mbit/s to Iridium Pilot marine terminals, and high-speed Ka-band service of up to 8 Mbit/s to fixed/transportable terminals. The next-generation terminals and service are expected to be commercially available by the end of 2018. However, Iridium's proposed use of its next-generation satellites has raised concerns the service will harmfully interfere with GPS devices. The satellites will incorporate a secondary payload for Aireon, a space-qualified ADS-B data receiver. This is for use by air traffic control and, via FlightAware, for use by airlines. A tertiary payload on 58 satellites is a marine AIS ship-tracker receiver, for Canadian company exactEarth Ltd. Iridium can also be used to provide a data link to other satellites in space, enabling command and control of other space assets regardless of the position of ground stations and gateways.",
    },
    {
      mission_name: 'Commercial Resupply Services',
      mission_id: 'EE86F74',
      manufacturers: ['SpaceX'],
      payload_ids: [
        'Dragon Qualification Unit',
        'COTS Demo Flight 1',
        'COTS Demo Flight 2',
        'SpaceX CRS-1',
        'SpaceX CRS-2',
        'SpaceX CRS-3',
        'SpaceX CRS-4',
        'SpaceX CRS-5',
        'SpaceX CRS-6',
        'SpaceX CRS-7',
        'SpaceX CRS-8',
        'SpaceX CRS-9',
        'SpaceX CRS-10',
        'SpaceX CRS-11',
        'SpaceX CRS-12',
        'SpaceX CRS-13',
        'SpaceX CRS-14',
        'SpaceX CRS-15',
      ],
      wikipedia: 'https://en.wikipedia.org/wiki/Commercial_Resupply_Services#SpaceX',
      website: 'https://www.spacex.com/',
      twitter: 'https://twitter.com/SpaceX',
      description:
        'Commercial Resupply Services (CRS) are a series of contracts awarded by NASA from 2008–2016 for delivery of cargo and supplies to the International Space Station (ISS) on commercially operated spacecraft. The first CRS contracts were signed in 2008 and awarded $1.6 billion to SpaceX for 12 cargo transport missions and $1.9 billion to Orbital Sciences for 8 missions, covering deliveries to 2016. In 2015, NASA extended the Phase 1 contracts by ordering an additional three resupply flights from SpaceX and one from Orbital Sciences. After additional extensions late in 2015, SpaceX is currently scheduled to have a total of 20 missions and Orbital 10. SpaceX began flying resupply missions in 2012, using Dragon cargo spacecraft launched on Falcon 9 rockets from Space Launch Complex 40 at Cape Canaveral Air Force Station, Cape Canaveral, Florida. Orbital Sciences began deliveries in 2013 using Cygnus spacecraft launched on the Antares rocket from Launch Pad 0A at the Mid-Atlantic Regional Spaceport (MARS), Wallops Island, Virginia. A second phase of contracts (known as CRS2) were solicited and proposed in 2014. They were awarded in January 2016 to Orbital ATK, Sierra Nevada Corporation, and SpaceX, for cargo transport flights beginning in 2019 and expected to last through 2024.',
    },
    {
      mission_name: 'Orbcomm OG2',
      mission_id: 'CE91D46',
      manufacturers: ['Sierra Nevada Corporation'],
      payload_ids: ['Orbcomm-OG2', 'Orbcomm-OG2-M1', 'Orbcomm-OG2-M2'],
      wikipedia: 'https://en.wikipedia.org/wiki/Orbcomm_(satellite)#Orbcomm-OG2',
      website: 'https://www.orbcomm.com/',
      twitter: 'https://twitter.com/orbcomm_inc',
      description:
        'Orbcomm Generation 2 (OG2) second-generation satellites are intended to supplement and eventually replace the current first generation constellation. Eighteen satellites were ordered by 2008—nominally intended to be launched in three groups of six during 2010–2014—and by 2015 have all been launched, on three flights. Orbcomm has options for a further thirty OG2 spacecraft. The satellites were launched by SpaceX on the Falcon 9 launch system. Originally, they were to launch on the smaller Falcon 1e rocket.',
    },
    {
      mission_name: 'SES',
      mission_id: '6C42550',
      manufacturers: ['Orbital ATK', 'Boeing', 'Airbus Defence and Space'],
      payload_ids: ['SES-8', 'SES-9', 'SES-10', 'SES-11', 'SES-16', 'SES-12'],
      wikipedia: 'https://en.wikipedia.org/wiki/SES_S.A.',
      website: 'https://www.ses.com/',
      twitter: 'https://twitter.com/SES_Satellites',
      description:
        'SES S.A. is a communications satellite owner and operator providing video and data connectivity worldwide to broadcasters, content and internet service providers, mobile and fixed network operators, governments and institutions, with a mission to “connect, enable, and enrich”. SES operates more than 50 geostationary orbit satellites and 16 medium Earth orbit satellites. These comprise the well-known European Astra TV satellites, the O3b data satellites and others with names including AMC, Ciel, NSS, Quetzsat, YahSat and SES.',
    },
  ],
  events: [
    {
      links: {
        article: 'http://www.spacex.com/news/2013/02/11/flight-4-launch-update-0',
      },
      title: 'Falcon reaches Earth orbit',
      event_date_utc: '2008-09-28T23:15:00Z',
      event_date_unix: 1222643700,
      details:
        'Falcon 1 becomes the first privately developed liquid-fuel rocket to reach Earth orbit.',
      id: '5f6fb2cfdcfdf403df37971e',
    },
    {
      links: {
        article: 'http://www.spacex.com/news/2013/02/12/falcon-1-flight-5',
      },
      title: 'Falcon delivers payload to orbit',
      event_date_utc: '2009-07-13T03:35:00Z',
      event_date_unix: 1247456100,
      details:
        'Fifth successful flight of Falcon makes history, becoming the first privately developed liquid-fuel rocket to deliver a commercial satellite to orbit.',
      id: '5f6fb2efdcfdf403df37971f',
    },
    {
      links: {
        article: 'http://www.bbc.com/news/10209704',
      },
      title: 'First successfull Dragon launch',
      event_date_utc: '2010-06-04T18:45:00Z',
      event_date_unix: 1275677100,
      details:
        'SpaceX becomes the first private company to successfully launch, orbit, and recover a spacecraft.',
      id: '5f6fb312dcfdf403df379720',
    },
    {
      links: {
        article: 'http://www.cnn.com/2010/US/12/08/space.flight/index.html',
      },
      title: 'Dragon capsule births with ISS',
      event_date_utc: '2010-12-08T15:43:00Z',
      event_date_unix: 1291822980,
      details:
        "Private developed Dragon spacecraft 'births' with the International Space Station successfully.",
      id: '5f6fb326dcfdf403df379721',
    },
    {
      links: {
        article:
          'http://www.newspacejournal.com/2013/03/27/after-dragon-spacexs-focus-returns-to-falcon/',
      },
      title: 'First Falcon 9 GTO mission',
      event_date_utc: '2013-12-03T22:41:00Z',
      event_date_unix: 1386110460,
      details: 'Falcon 9 successfully depoyed payload to Geosynchronous Transfer Orbit',
      id: '5f6fb343dcfdf403df379722',
    },
    {
      links: {
        article:
          'https://spaceflightnow.com/2015/12/22/round-trip-rocket-flight-gives-spacex-a-trifecta-of-successes/',
      },
      title: 'Successfull Falcon 9 landing',
      event_date_utc: '2015-12-22T01:29:00Z',
      event_date_unix: 1450747740,
      details:
        'On December 21, 2015, the Falcon 9 rocket delivered 11 communications satellites to orbit, and the first stage returned and landed at Landing Zone 1 – the first-ever orbital class rocket landing.',
      id: '5f6fb37ddcfdf403df379723',
    },
    {
      links: {
        article:
          'https://spaceflightnow.com/2016/04/08/spacex-lands-rocket-on-floating-platform-after-station-resupply-launch/',
      },
      title: 'Successfull Falcon 9 droneship landing',
      event_date_utc: '2016-04-08T20:43:00Z',
      event_date_unix: 1460148180,
      details:
        'On April 8, 2016, the Falcon 9 rocket launched the Dragon spacecraft to the International Space Station, and the first stage returned and landed on the Of Course I Still Love You droneship.',
      id: '5f6fb391dcfdf403df379724',
    },
    {
      links: {
        article:
          'https://spaceflightnow.com/2017/03/31/spacex-flies-rocket-for-second-time-in-historic-test-of-cost-cutting-technology/',
      },
      title: 'First Falcon 9 reflight',
      event_date_utc: '2017-03-30T22:27:00Z',
      event_date_unix: 1490912820,
      details:
        "On March 30, 2017, SpaceX achieved the world's first reflight of an orbital class rocket. Following delivery of the payload, the Falcon 9 first stage returned to Earth for the second time.",
      id: '5f6fb3a7dcfdf403df379725',
    },
    {
      links: {
        article:
          'https://spaceflightnow.com/2017/03/31/spacex-flies-rocket-for-second-time-in-historic-test-of-cost-cutting-technology/',
      },
      title: 'Fairing recovered successfully',
      event_date_utc: '2017-03-30T22:27:00Z',
      event_date_unix: 1490912820,
      details:
        'The fairing section used in this flight was successfuly recovered from the ocean, following a controlled flyback throug the atmosphere.',
      id: '5f6fb3b9dcfdf403df379726',
    },
    {
      links: {
        article:
          'https://spaceflightnow.com/2017/06/03/reused-dragon-cargo-capsule-launched-on-journey-to-space-station/',
      },
      title: 'First Dragon reflight',
      event_date_utc: '2017-06-03T21:07:00Z',
      event_date_unix: 1496524020,
      details:
        'This Dragon resupply mission represented the first reflight of a commercial spacecraft to and from the International Space Station.',
      id: '5f6fb3cadcfdf403df379727',
    },
    {
      links: {
        article:
          'https://spaceflightnow.com/2018/02/07/spacex-debuts-worlds-most-powerful-rocket-sends-tesla-toward-the-asteroid-belt/',
      },
      title: 'First Falcon Heavy heliocentric mission',
      event_date_utc: '2018-02-06T20:45:00Z',
      event_date_unix: 1517949900,
      details:
        "Maiden flight of Falcon Heavy, using two recovered Falcon 9 cores as side boosters, as well as a modified Block 3 booster reinforced to endure the additional load from the two side boosters. The launch was a success, and the side boosters landed simultaneously at adjacent ground pads. Drone ship landing of the central core failed due to TEA–TEB chemical igniter running out, preventing two of its engines from restarting. Final burn to heliocentric Mars–Earth orbit was performed after the second stage and payload cruised for 6 hours through the Van Allen belts. Later, Elon Musk tweeted that the third burn was successful, and JPL's HORIZONS system showed the second stage and payload in an orbit with an aphelion of 1.67 AU. The live webcast proved immensely popular, as it became the second most watched livestream ever on YouTube, reaching over 2.3 million concurrent views",
      id: '5f6fb3e4dcfdf403df379728',
    },
    {
      links: {
        article:
          'https://spaceflightnow.com/2019/03/02/spacex-launches-first-crew-dragon-ferry-ship/',
      },
      title: 'Successfull Dragon 2 docking with ISS',
      event_date_utc: '2019-03-02T07:45:00Z',
      event_date_unix: 1551512700,
      details:
        'SpaceX successfully launches Dragon 2, on top of the now human-rated Falcon 9. This was the first a private company sends a human-rated spacecraft to space.',
      id: '5f6fb3f8dcfdf403df379729',
    },
    {
      links: {
        article: null,
      },
      title: 'First flight of Raptor engine',
      event_date_utc: '2019-07-25T00:00:00Z',
      event_date_unix: 1564012800,
      details:
        'The first flight test of a Raptor engine occurred on 25 July 2019 at the SpaceX South Texas Launch Site. This was not a full-duration burn, but just a 22-second test.',
      id: '5f6fb417dcfdf403df37972a',
    },
    {
      links: {
        article: null,
      },
      title: 'First Falcon 9 fairing reuse',
      event_date_utc: '2020-09-03T12:46:00Z',
      event_date_unix: 1599137160,
      details:
        'This was the fist time payload fairing of an orbital rocket was reused in another flight. The fairing was from the ArabSat-6A mission in April earlier that year.',
      id: '5f6fb433dcfdf403df37972b',
    },
    {
      links: {
        article:
          'https://spaceflightnow.com/2020/05/30/nasa-astronauts-launch-from-us-soil-for-first-time-in-nine-years/',
      },
      title: 'SpaceX successfully launches humans to ISS',
      event_date_utc: '2020-05-30T19:22:00Z',
      event_date_unix: 1590866520,
      details:
        'This mission was the first crewed flight to launch from the United States since the end of the Space Shuttle program in 2011. It carried NASA astronauts Doug Hurley and Bob Behnken to the ISS.',
      id: '5f6fb44ddcfdf403df37972c',
    },
  ],
};

document.getElementById('app-root').innerHTML = App();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function Rockets() {
  return `<div>
        <h1>Rockets</h1>
        ${window.data.rockets.map(
          rocket => `<div>
            <div>
                <img src="${rocket.flickr_images[0]}" alt="${rocket.name}">
                <p>${rocket.description}</p>
            </div>
            <div>
                <h2><a href="${rocket.wikipedia}">${rocket.name}</a></h2>
                <table>
                    <tbody>
                        <tr>
                            <td>HEIGHT:</td>
                            <td>${rocket.height.meters} m</td>
                        </tr>
                        <tr>
                            <td>DIAMETER:</td>
                            <td>${rocket.diameter.meters} m</td>
                        </tr>
                        <tr>
                            <td>MASS:</td>
                            <td>${rocket.mass.kg} kg</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>`,
        )}
    </div>`;
}

function Missions() {
  return `<div>
    <h1>Missions</h1>
        ${window.data.missions.map(
          mission => `<div>
            <a href="${mission.wikipedia}">${mission.mission_name}</a>
            <p>${mission.description}</p>
        </div>`,
        )}
    </div>`;
}

function Event() {
  const randomId = getRandomInt(window.data.events.length);
  const event = window.data.events[randomId];

  return `<div>
        <p>${event.title}</p>
        <p>${event.details}</p>
    </div>`;
}

function App() {
  return `<div>
        ${Rockets()}
        <hr>
        ${Missions()}
        <hr>
        ${Event()}
    </div>`;
}
