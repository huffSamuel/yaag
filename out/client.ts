import { HttpClient, inject } from '@angular/common';

class Client {
    private readonly httpClient = inject(httpClient);


}

export interface Configuration {
  foo: string;
}

export const newClient = (c: Configuration, f: Fetch = fetch) => {
  return {
    ...endpoints(c, f),
  }
}

/**
 * Ship details.
 */

export type Ship = {
        
    reactor: ShipReactor;
        /**
 * Modules installed in this ship.
 */
    modules: ShipModule[];
        /**
 * Mounts installed in this ship.
 */
    mounts: ShipMount[];
        
    cargo: ShipCargo;
        /**
 * The globally unique identifier of the ship in the following format: `[AGENT_SYMBOL]-[HEX_ID]`
 */
    symbol: string;
        
    nav: ShipNav;
        
    frame: ShipFrame;
        
    cooldown: Cooldown;
        
    fuel: ShipFuel;
        
    registration: ShipRegistration;
        
    crew: ShipCrew;
        
    engine: ShipEngine;
    
}

/**
 * The engine determines how quickly a ship travels between waypoints.
 */

export type ShipEngine = {
        /**
 * The symbol of the engine.
 */
    symbol: string;
        /**
 * The name of the engine.
 */
    name: string;
        /**
 * The description of the engine.
 */
    description: string;
        
    condition: ShipComponentCondition;
        
    integrity: ShipComponentIntegrity;
        /**
 * The speed stat of this engine. The higher the speed, the faster a ship can travel from one point to another. Reduces the time of arrival when navigating the ship.
 */
    speed: number;
        
    requirements: ShipRequirements;
    
}

/**
 * The details of the required construction materials for a given waypoint under construction.
 */

export type ConstructionMaterial = {
        
    tradeSymbol: TradeSymbol;
        /**
 * The number of units required.
 */
    required: number;
        /**
 * The number of units fulfilled toward the required amount.
 */
    fulfilled: number;
    
}

/**
 * Result of a transaction with a market.
 */

export type MarketTransaction = {
        /**
 * The number of units of the transaction.
 */
    units: number;
        /**
 * The price per unit of the transaction.
 */
    pricePerUnit: number;
        /**
 * The total price of the transaction.
 */
    totalPrice: number;
        /**
 * The timestamp of the transaction.
 */
    timestamp: string;
        
    waypointSymbol: WaypointSymbol;
        /**
 * The symbol of the ship that made the transaction.
 */
    shipSymbol: string;
        /**
 * The symbol of the trade good.
 */
    tradeSymbol: string;
        /**
 * The type of transaction.
 */
    type: string;
    
}

/**
 * The frame of the ship.
 */

export type ScannedShipFrame = {
        /**
 * The symbol of the frame.
 */
    symbol: string;
    
}

/**
 * The reactor of the ship.
 */

export type ScannedShipReactor = {
        /**
 * The symbol of the reactor.
 */
    symbol: string;
    
}

/**
 * The engine of the ship.
 */

export type ScannedShipEngine = {
        /**
 * The symbol of the engine.
 */
    symbol: string;
    
}

/**
 * A mount on the ship.
 */

export type ScannedShipMounts = {
        /**
 * The symbol of the mount.
 */
    symbol: string;
    
}

/**
 * The ship that was scanned. Details include information about the ship that could be detected by the scanner.
 */

export type ScannedShip = {
        /**
 * The frame of the ship.
 */
    frame: ScannedShipFrame;
        /**
 * The reactor of the ship.
 */
    reactor: ScannedShipReactor;
        /**
 * The engine of the ship.
 */
    engine: ScannedShipEngine;
        /**
 * List of mounts installed in the ship.
 */
    mounts: ScannedShipMounts[];
        /**
 * The globally unique identifier of the ship.
 */
    symbol: string;
        
    registration: ShipRegistration;
        
    nav: ShipNav;
    
}

/**
 * A good that can be traded for other goods or currency.
 */

export type TradeGood = {
        
    symbol: TradeSymbol;
        /**
 * The name of the good.
 */
    name: string;
        /**
 * The description of the good.
 */
    description: string;
    
}

/**
 * The ship's crew service and maintain the ship's systems and equipment.
 */

export type ShipCrew = {
        /**
 * The rotation of crew shifts. A stricter shift improves the ship's performance. A more relaxed shift improves the crew's morale.
 */
    rotation: string;
        /**
 * A rough measure of the crew's morale. A higher morale means the crew is happier and more productive. A lower morale means the ship is more prone to accidents.
 */
    morale: number;
        /**
 * The amount of credits per crew member paid per hour. Wages are paid when a ship docks at a civilized waypoint.
 */
    wages: number;
        /**
 * The current number of crew members on the ship.
 */
    current: number;
        /**
 * The minimum number of crew members required to maintain the ship.
 */
    required: number;
        /**
 * The maximum number of crew members the ship can support.
 */
    capacity: number;
    
}

/**
 * The registered role of the ship
 */
export enum ShipRole {
          fabricator = "FABRICATOR",
          harvester = "HARVESTER",
          hauler = "HAULER",
          interceptor = "INTERCEPTOR",
          excavator = "EXCAVATOR",
          transport = "TRANSPORT",
          repair = "REPAIR",
          surveyor = "SURVEYOR",
          command = "COMMAND",
          carrier = "CARRIER",
          patrol = "PATROL",
          satellite = "SATELLITE",
          explorer = "EXPLORER",
          refinery = "REFINERY",
    
}


/**
 * A module can be installed in a ship and provides a set of capabilities such as storage space or quarters for crew. Module installations are permanent.
 */

export type ShipModule = {
        
    requirements: ShipRequirements;
        /**
 * The symbol of the module.
 */
    symbol: string;
        /**
 * Modules that provide capacity, such as cargo hold or crew quarters will show this value to denote how much of a bonus the module grants.
 */
    capacity: number;
        /**
 * Modules that have a range will such as a sensor array show this value to denote how far can the module reach with its capabilities.
 */
    range: number;
        /**
 * Name of this module.
 */
    name: string;
        /**
 * Description of this module.
 */
    description: string;
    
}

/**
 * The details of a delivery contract. Includes the type of good, units needed, and the destination.
 */

export type ContractDeliverGood = {
        /**
 * The destination where goods need to be delivered.
 */
    destinationSymbol: string;
        /**
 * The number of units that need to be delivered on this contract.
 */
    unitsRequired: number;
        /**
 * The number of units fulfilled on this contract.
 */
    unitsFulfilled: number;
        /**
 * The symbol of the trade good to deliver.
 */
    tradeSymbol: string;
    
}

/**
 * The type of system.
 */
export enum SystemType {
          neutron_star = "NEUTRON_STAR",
          red_star = "RED_STAR",
          orange_star = "ORANGE_STAR",
          blue_star = "BLUE_STAR",
          young_star = "YOUNG_STAR",
          white_dwarf = "WHITE_DWARF",
          black_hole = "BLACK_HOLE",
          hypergiant = "HYPERGIANT",
          nebula = "NEBULA",
          unstable = "UNSTABLE",
    
}


/**
 * A yield from the siphon operation.
 */

export type SiphonYield = {
        
    symbol: TradeSymbol;
        /**
 * The number of units siphoned that were placed into the ship's cargo hold.
 */
    units: number;
    
}



export type MarketTradeGood = {
        
    activity: ActivityLevel;
        /**
 * The price at which this good can be purchased from the market.
 */
    purchasePrice: number;
        /**
 * The price at which this good can be sold to the market.
 */
    sellPrice: number;
        
    symbol: TradeSymbol;
        /**
 * The type of trade good (export, import, or exchange).
 */
    type: string;
        /**
 * This is the maximum number of units that can be purchased or sold at this market in a single trade for this good. Trade volume also gives an indication of price volatility. A market with a low trade volume will have large price swings, while high trade volume will be more resilient to price changes.
 */
    tradeVolume: number;
        
    supply: SupplyLevel;
    
}

/**
 * The symbol of the waypoint.
 */


export type WaypointSymbol = string;/**
 * A waypoint is a location that ships can travel to such as a Planet, Moon or Space Station.
 */

export type Waypoint = {
        
    symbol: WaypointSymbol;
        
    type: WaypointType;
        /**
 * Relative position of the waypoint on the system's x axis. This is not an absolute position in the universe.
 */
    x: number;
        /**
 * The symbol of the parent waypoint, if this waypoint is in orbit around another waypoint. Otherwise this value is undefined.
 */
    orbits: string;
        
    faction: WaypointFaction;
        /**
 * True if the waypoint is under construction.
 */
    isUnderConstruction: boolean;
        
    systemSymbol: SystemSymbol;
        /**
 * Relative position of the waypoint on the system's y axis. This is not an absolute position in the universe.
 */
    y: number;
        /**
 * Waypoints that orbit this waypoint.
 */
    orbitals: WaypointOrbital[];
        /**
 * The traits of the waypoint.
 */
    traits: WaypointTrait[];
        /**
 * The modifiers of the waypoint.
 */
    modifiers: WaypointModifier[];
        
    chart: Chart;
    
}

/**
 * The overall integrity of the component, which determines the performance of the component. A value of 0 indicates that the component is almost completely degraded, while a value of 1 indicates that the component is in near perfect condition. The integrity of the component is non-repairable, and represents permanent wear over time.
 */


export type ShipComponentIntegrity = number;/**
 * The type of cargo item and the number of units.
 */

export type ShipCargoItem = {
        
    symbol: TradeSymbol;
        /**
 * The name of the cargo item type.
 */
    name: string;
        /**
 * The description of the cargo item type.
 */
    description: string;
        /**
 * The number of units of the cargo item.
 */
    units: number;
    
}

/**
 * The unique identifier of the modifier.
 */
export enum WaypointModifierSymbol {
          stripped = "STRIPPED",
          unstable = "UNSTABLE",
          radiation_leak = "RADIATION_LEAK",
          critical_limit = "CRITICAL_LIMIT",
          civil_unrest = "CIVIL_UNREST",
    
}


/**
 * Siphon details.
 */

export type Siphon = {
        
    yield: SiphonYield;
        /**
 * Symbol of the ship that executed the siphon.
 */
    shipSymbol: string;
    
}

/**
 * Details of a system was that scanned.
 */

export type ScannedSystem = {
        /**
 * Symbol of the system.
 */
    symbol: string;
        /**
 * Symbol of the system's sector.
 */
    sectorSymbol: string;
        
    type: SystemType;
        /**
 * Position in the universe in the x axis.
 */
    x: number;
        /**
 * Position in the universe in the y axis.
 */
    y: number;
        /**
 * The system's distance from the scanning ship.
 */
    distance: number;
    
}

/**
 * The public registration information of the ship
 */

export type ShipRegistration = {
        /**
 * The agent's registered name of the ship
 */
    name: string;
        /**
 * The symbol of the faction the ship is registered with
 */
    factionSymbol: string;
        
    role: ShipRole;
    
}



export type FactionTrait = {
        
    symbol: FactionTraitSymbol;
        /**
 * The name of the trait.
 */
    name: string;
        /**
 * A description of the trait.
 */
    description: string;
    
}

/**
 * A mount is installed on the exterier of a ship.
 */

export type ShipMount = {
        /**
 * Description of this mount.
 */
    description: string;
        /**
 * Mounts that have this value, such as mining lasers, denote how powerful this mount's capabilities are.
 */
    strength: number;
        /**
 * Mounts that have this value denote what goods can be produced from using the mount.
 */
    deposits: string[];
        
    requirements: ShipRequirements;
        /**
 * Symbo of this mount.
 */
    symbol: string;
        /**
 * Name of this mount.
 */
    name: string;
    
}

/**
 * Type of ship
 */
export enum ShipType {
          ship_probe = "SHIP_PROBE",
          ship_mining_drone = "SHIP_MINING_DRONE",
          ship_siphon_drone = "SHIP_SIPHON_DRONE",
          ship_interceptor = "SHIP_INTERCEPTOR",
          ship_light_hauler = "SHIP_LIGHT_HAULER",
          ship_command_frigate = "SHIP_COMMAND_FRIGATE",
          ship_explorer = "SHIP_EXPLORER",
          ship_heavy_freighter = "SHIP_HEAVY_FREIGHTER",
          ship_light_shuttle = "SHIP_LIGHT_SHUTTLE",
          ship_ore_hound = "SHIP_ORE_HOUND",
          ship_refining_freighter = "SHIP_REFINING_FREIGHTER",
          ship_surveyor = "SHIP_SURVEYOR",
    
}


/**
 * An event that represents damage or wear to a ship's reactor, frame, or engine, reducing the condition of the ship.
 */

export type ShipConditionEvent = {
        
    symbol: string;
        
    component: string;
        /**
 * The name of the event.
 */
    name: string;
        /**
 * A description of the event.
 */
    description: string;
    
}

/**
 * The chart of a system or waypoint, which makes the location visible to other agents.
 */

export type Chart = {
        
    waypointSymbol: WaypointSymbol;
        /**
 * The agent that submitted the chart for this waypoint.
 */
    submittedBy: string;
        /**
 * The time the chart for this waypoint was submitted.
 */
    submittedOn: string;
    
}

/**
 * Result of a repair transaction.
 */

export type RepairTransaction = {
        /**
 * The timestamp of the transaction.
 */
    timestamp: string;
        
    waypointSymbol: WaypointSymbol;
        /**
 * The symbol of the ship.
 */
    shipSymbol: string;
        /**
 * The total price of the transaction.
 */
    totalPrice: number;
    
}

/**
 * A cooldown is a period of time in which a ship cannot perform certain actions.
 */

export type Cooldown = {
        /**
 * The symbol of the ship that is on cooldown
 */
    shipSymbol: string;
        /**
 * The total duration of the cooldown in seconds
 */
    totalSeconds: number;
        /**
 * The remaining duration of the cooldown in seconds
 */
    remainingSeconds: number;
        /**
 * The date and time when the cooldown expires in ISO 8601 format
 */
    expiration: string;
    
}

/**
 * The type of waypoint.
 */
export enum WaypointType {
          planet = "PLANET",
          gas_giant = "GAS_GIANT",
          moon = "MOON",
          orbital_station = "ORBITAL_STATION",
          jump_gate = "JUMP_GATE",
          asteroid_field = "ASTEROID_FIELD",
          asteroid = "ASTEROID",
          engineered_asteroid = "ENGINEERED_ASTEROID",
          asteroid_base = "ASTEROID_BASE",
          nebula = "NEBULA",
          debris_field = "DEBRIS_FIELD",
          gravity_well = "GRAVITY_WELL",
          artificial_gravity_well = "ARTIFICIAL_GRAVITY_WELL",
          fuel_station = "FUEL_STATION",
    
}


/**
 * The faction that controls the waypoint.
 */

export type WaypointFaction = {
        
    symbol: FactionSymbol;
    
}

/**
 * The activity level of a trade good. If the good is an import, this represents how strong consumption is. If the good is an export, this represents how strong the production is for the good. When activity is strong, consumption or production is near maximum capacity. When activity is weak, consumption or production is near minimum capacity.
 */
export enum ActivityLevel {
          weak = "WEAK",
          growing = "GROWING",
          strong = "STRONG",
          restricted = "RESTRICTED",
    
}




export type WaypointModifier = {
        
    symbol: WaypointModifierSymbol;
        /**
 * The name of the trait.
 */
    name: string;
        /**
 * A description of the trait.
 */
    description: string;
    
}

/**
 * The reactor of the ship. The reactor is responsible for powering the ship's systems and weapons.
 */

export type ShipReactor = {
        
    requirements: ShipRequirements;
        /**
 * Symbol of the reactor.
 */
    symbol: string;
        /**
 * Name of the reactor.
 */
    name: string;
        /**
 * Description of the reactor.
 */
    description: string;
        
    condition: ShipComponentCondition;
        
    integrity: ShipComponentIntegrity;
        /**
 * The amount of power provided by this reactor. The more power a reactor provides to the ship, the lower the cooldown it gets when using a module or mount that taxes the ship's power.
 */
    powerOutput: number;
    
}

/**
 * A waypoint that was scanned by a ship.
 */

export type ScannedWaypoint = {
        
    systemSymbol: SystemSymbol;
        /**
 * Position in the universe in the x axis.
 */
    x: number;
        /**
 * List of waypoints that orbit this waypoint.
 */
    orbitals: WaypointOrbital[];
        
    faction: WaypointFaction;
        
    symbol: WaypointSymbol;
        
    type: WaypointType;
        /**
 * Position in the universe in the y axis.
 */
    y: number;
        /**
 * The traits of the waypoint.
 */
    traits: WaypointTrait[];
        
    chart: Chart;
    
}

/**
 * Meta details for pagination.
 */

export type Meta = {
        /**
 * Shows the total amount of items of this kind that exist.
 */
    total: number;
        /**
 * A page denotes an amount of items, offset from the first item. Each page holds an amount of items equal to the `limit`.
 */
    page: number;
        /**
 * The amount of items in each page. Limits how many items can be fetched at once.
 */
    limit: number;
    
}

/**
 * Results of a transaction with a shipyard.
 */

export type ShipyardTransaction = {
        
    waypointSymbol: WaypointSymbol;
        /**
 * The symbol of the ship that was the subject of the transaction.
 */
    shipSymbol: string;
        /**
 * The symbol of the ship that was the subject of the transaction.
 */
    shipType: string;
        /**
 * The price of the transaction.
 */
    price: number;
        /**
 * The symbol of the agent that made the transaction.
 */
    agentSymbol: string;
        /**
 * The timestamp of the transaction.
 */
    timestamp: string;
    
}

/**
 * Result of a transaction for a ship modification, such as installing a mount or a module.
 */

export type ShipModificationTransaction = {
        /**
 * The symbol of the waypoint where the transaction took place.
 */
    waypointSymbol: string;
        /**
 * The symbol of the ship that made the transaction.
 */
    shipSymbol: string;
        /**
 * The symbol of the trade good.
 */
    tradeSymbol: string;
        /**
 * The total price of the transaction.
 */
    totalPrice: number;
        /**
 * The timestamp of the transaction.
 */
    timestamp: string;
    
}

/**
 * 
 */

export type JumpGate = {
        
    symbol: WaypointSymbol;
        /**
 * All the gates that are connected to this waypoint.
 */
    connections: string[];
    
}

/**
 * The symbol of the faction.
 */
export enum FactionSymbol {
          cosmic = "COSMIC",
          void = "VOID",
          galactic = "GALACTIC",
          quantum = "QUANTUM",
          dominion = "DOMINION",
          astro = "ASTRO",
          corsairs = "CORSAIRS",
          obsidian = "OBSIDIAN",
          aegis = "AEGIS",
          united = "UNITED",
          solitary = "SOLITARY",
          cobalt = "COBALT",
          omega = "OMEGA",
          echo = "ECHO",
          lords = "LORDS",
          cult = "CULT",
          ancients = "ANCIENTS",
          shadow = "SHADOW",
          ethereal = "ETHEREAL",
    
}


/**
 * The unique identifier of the trait.
 */
export enum FactionTraitSymbol {
          bureaucratic = "BUREAUCRATIC",
          secretive = "SECRETIVE",
          capitalistic = "CAPITALISTIC",
          industrious = "INDUSTRIOUS",
          peaceful = "PEACEFUL",
          distrustful = "DISTRUSTFUL",
          welcoming = "WELCOMING",
          smugglers = "SMUGGLERS",
          scavengers = "SCAVENGERS",
          rebellious = "REBELLIOUS",
          exiles = "EXILES",
          pirates = "PIRATES",
          raiders = "RAIDERS",
          clan = "CLAN",
          guild = "GUILD",
          dominion = "DOMINION",
          fringe = "FRINGE",
          forsaken = "FORSAKEN",
          isolated = "ISOLATED",
          localized = "LOCALIZED",
          established = "ESTABLISHED",
          notable = "NOTABLE",
          dominant = "DOMINANT",
          inescapable = "INESCAPABLE",
          innovative = "INNOVATIVE",
          bold = "BOLD",
          visionary = "VISIONARY",
          curious = "CURIOUS",
          daring = "DARING",
          exploratory = "EXPLORATORY",
          resourceful = "RESOURCEFUL",
          flexible = "FLEXIBLE",
          cooperative = "COOPERATIVE",
          united = "UNITED",
          strategic = "STRATEGIC",
          intelligent = "INTELLIGENT",
          research_focused = "RESEARCH_FOCUSED",
          collaborative = "COLLABORATIVE",
          progressive = "PROGRESSIVE",
          militaristic = "MILITARISTIC",
          technologically_advanced = "TECHNOLOGICALLY_ADVANCED",
          aggressive = "AGGRESSIVE",
          imperialistic = "IMPERIALISTIC",
          treasure_hunters = "TREASURE_HUNTERS",
          dexterous = "DEXTEROUS",
          unpredictable = "UNPREDICTABLE",
          brutal = "BRUTAL",
          fleeting = "FLEETING",
          adaptable = "ADAPTABLE",
          self_sufficient = "SELF_SUFFICIENT",
          defensive = "DEFENSIVE",
          proud = "PROUD",
          diverse = "DIVERSE",
          independent = "INDEPENDENT",
          self_interested = "SELF_INTERESTED",
          fragmented = "FRAGMENTED",
          commercial = "COMMERCIAL",
          free_markets = "FREE_MARKETS",
          entrepreneurial = "ENTREPRENEURIAL",
    
}


/**
 * Agent details.
 */

export type Agent = {
        /**
 * Account ID that is tied to this agent. Only included on your own agent.
 */
    accountId: string;
        /**
 * Symbol of the agent.
 */
    symbol: string;
        /**
 * The headquarters of the agent.
 */
    headquarters: string;
        /**
 * The number of credits the agent has available. Credits can be negative if funds have been overdrawn.
 */
    credits: number;
        /**
 * The faction the agent started with.
 */
    startingFaction: string;
        /**
 * How many ships are owned by the agent.
 */
    shipCount: number;
    
}

/**
 * The frame of the ship. The frame determines the number of modules and mounting points of the ship, as well as base fuel capacity. As the condition of the frame takes more wear, the ship will become more sluggish and less maneuverable.
 */

export type ShipFrame = {
        /**
 * Symbol of the frame.
 */
    symbol: string;
        /**
 * Name of the frame.
 */
    name: string;
        
    integrity: ShipComponentIntegrity;
        /**
 * The amount of slots that can be dedicated to modules installed in the ship. Each installed module take up a number of slots, and once there are no more slots, no new modules can be installed.
 */
    moduleSlots: number;
        /**
 * The amount of slots that can be dedicated to mounts installed in the ship. Each installed mount takes up a number of points, and once there are no more points remaining, no new mounts can be installed.
 */
    mountingPoints: number;
        
    requirements: ShipRequirements;
        /**
 * Description of the frame.
 */
    description: string;
        
    condition: ShipComponentCondition;
        /**
 * The maximum amount of fuel that can be stored in this ship. When refueling, the ship will be refueled to this amount.
 */
    fuelCapacity: number;
    
}

/**
 * Extraction details.
 */

export type Extraction = {
        /**
 * Symbol of the ship that executed the extraction.
 */
    shipSymbol: string;
        
    yield: ExtractionYield;
    
}

/**
 * A yield from the extraction operation.
 */

export type ExtractionYield = {
        
    symbol: TradeSymbol;
        /**
 * The number of units extracted that were placed into the ship's cargo hold.
 */
    units: number;
    
}

/**
 * Payments for the contract.
 */

export type ContractPayment = {
        /**
 * The amount of credits received up front for accepting the contract.
 */
    onAccepted: number;
        /**
 * The amount of credits received when the contract is fulfilled.
 */
    onFulfilled: number;
    
}

/**
 * The requirements for installation on a ship
 */

export type ShipRequirements = {
        /**
 * The amount of power required from the reactor.
 */
    power: number;
        /**
 * The number of crew required for operation.
 */
    crew: number;
        /**
 * The number of module slots required for installation.
 */
    slots: number;
    
}

/**
 * 
 */

export type Market = {
        /**
 * The symbol of the market. The symbol is the same as the waypoint where the market is located.
 */
    symbol: string;
        /**
 * The list of goods that are exported from this market.
 */
    exports: TradeGood[];
        /**
 * The list of goods that are sought as imports in this market.
 */
    imports: TradeGood[];
        /**
 * The list of goods that are bought and sold between agents at this market.
 */
    exchange: TradeGood[];
        /**
 * The list of recent transactions at this market. Visible only when a ship is present at the market.
 */
    transactions: MarketTransaction[];
        /**
 * The list of goods that are traded at this market. Visible only when a ship is present at the market.
 */
    tradeGoods: MarketTradeGood[];
    
}



export type SystemWaypoint = {
        
    symbol: WaypointSymbol;
        
    type: WaypointType;
        /**
 * Relative position of the waypoint on the system's x axis. This is not an absolute position in the universe.
 */
    x: number;
        /**
 * Relative position of the waypoint on the system's y axis. This is not an absolute position in the universe.
 */
    y: number;
        /**
 * Waypoints that orbit this waypoint.
 */
    orbitals: WaypointOrbital[];
        /**
 * The symbol of the parent waypoint, if this waypoint is in orbit around another waypoint. Otherwise this value is undefined.
 */
    orbits: string;
    
}

/**
 * A resource survey of a waypoint, detailing a specific extraction location and the types of resources that can be found there.
 */

export type Survey = {
        /**
 * The date and time when the survey expires. After this date and time, the survey will no longer be available for extraction.
 */
    expiration: string;
        /**
 * The size of the deposit. This value indicates how much can be extracted from the survey before it is exhausted.
 */
    size: string;
        /**
 * A unique signature for the location of this survey. This signature is verified when attempting an extraction using this survey.
 */
    signature: string;
        /**
 * The symbol of the waypoint that this survey is for.
 */
    symbol: string;
        /**
 * A list of deposits that can be found at this location. A ship will extract one of these deposits when using this survey in an extraction request. If multiple deposits of the same type are present, the chance of extracting that deposit is increased.
 */
    deposits: SurveyDeposit[];
    
}

/**
 * The routing information for the ship's most recent transit or current location.
 */

export type ShipNavRoute = {
        
    destination: ShipNavRouteWaypoint;
        
    origin: ShipNavRouteWaypoint;
        /**
 * The date time of the ship's departure.
 */
    departureTime: string;
        /**
 * The date time of the ship's arrival. If the ship is in-transit, this is the expected time of arrival.
 */
    arrival: string;
    
}

/**
 * The navigation information of the ship.
 */

export type ShipNav = {
        
    status: ShipNavStatus;
        
    flightMode: ShipNavFlightMode;
        
    systemSymbol: SystemSymbol;
        
    waypointSymbol: WaypointSymbol;
        
    route: ShipNavRoute;
    
}

/**
 * The supply level of a trade good.
 */
export enum SupplyLevel {
          scarce = "SCARCE",
          limited = "LIMITED",
          moderate = "MODERATE",
          high = "HIGH",
          abundant = "ABUNDANT",
    
}




export type ShipyardShipTypes = {
        
    type: ShipType;
    
}

/**
 * 
 */

export type Shipyard = {
        /**
 * The ships that are currently available for purchase at the shipyard.
 */
    ships: ShipyardShip[];
        /**
 * The fee to modify a ship at this shipyard. This includes installing or removing modules and mounts on a ship. In the case of mounts, the fee is a flat rate per mount. In the case of modules, the fee is per slot the module occupies.
 */
    modificationsFee: number;
        /**
 * The symbol of the shipyard. The symbol is the same as the waypoint where the shipyard is located.
 */
    symbol: string;
        /**
 * The list of ship types available for purchase at this shipyard.
 */
    shipTypes: ShipyardShipTypes[];
        /**
 * The list of recent transactions at this shipyard.
 */
    transactions: ShipyardTransaction[];
    
}

/**
 * The construction details of a waypoint.
 */

export type Construction = {
        /**
 * The symbol of the waypoint.
 */
    symbol: string;
        /**
 * The materials required to construct the waypoint.
 */
    materials: ConstructionMaterial[];
        /**
 * Whether the waypoint has been constructed.
 */
    isComplete: boolean;
    
}

/**
 * The current status of the ship
 */
export enum ShipNavStatus {
          in_transit = "IN_TRANSIT",
          in_orbit = "IN_ORBIT",
          docked = "DOCKED",
    
}




export type SystemFaction = {
        
    symbol: FactionSymbol;
    
}

/**
 * Faction details.
 */

export type Faction = {
        /**
 * Name of the faction.
 */
    name: string;
        /**
 * Description of the faction.
 */
    description: string;
        /**
 * The waypoint in which the faction's HQ is located in.
 */
    headquarters: string;
        /**
 * List of traits that define this faction.
 */
    traits: FactionTrait[];
        /**
 * Whether or not the faction is currently recruiting new agents.
 */
    isRecruiting: boolean;
        
    symbol: FactionSymbol;
    
}

/**
 * The repairable condition of a component. A value of 0 indicates the component needs significant repairs, while a value of 1 indicates the component is in near perfect condition. As the condition of a component is repaired, the overall integrity of the component decreases.
 */


export type ShipComponentCondition = number;/**
 * The unique identifier of the trait.
 */
export enum WaypointTraitSymbol {
          uncharted = "UNCHARTED",
          under_construction = "UNDER_CONSTRUCTION",
          marketplace = "MARKETPLACE",
          shipyard = "SHIPYARD",
          outpost = "OUTPOST",
          scattered_settlements = "SCATTERED_SETTLEMENTS",
          sprawling_cities = "SPRAWLING_CITIES",
          mega_structures = "MEGA_STRUCTURES",
          pirate_base = "PIRATE_BASE",
          overcrowded = "OVERCROWDED",
          high_tech = "HIGH_TECH",
          corrupt = "CORRUPT",
          bureaucratic = "BUREAUCRATIC",
          trading_hub = "TRADING_HUB",
          industrial = "INDUSTRIAL",
          black_market = "BLACK_MARKET",
          research_facility = "RESEARCH_FACILITY",
          military_base = "MILITARY_BASE",
          surveillance_outpost = "SURVEILLANCE_OUTPOST",
          exploration_outpost = "EXPLORATION_OUTPOST",
          mineral_deposits = "MINERAL_DEPOSITS",
          common_metal_deposits = "COMMON_METAL_DEPOSITS",
          precious_metal_deposits = "PRECIOUS_METAL_DEPOSITS",
          rare_metal_deposits = "RARE_METAL_DEPOSITS",
          methane_pools = "METHANE_POOLS",
          ice_crystals = "ICE_CRYSTALS",
          explosive_gases = "EXPLOSIVE_GASES",
          strong_magnetosphere = "STRONG_MAGNETOSPHERE",
          vibrant_auroras = "VIBRANT_AURORAS",
          salt_flats = "SALT_FLATS",
          canyons = "CANYONS",
          perpetual_daylight = "PERPETUAL_DAYLIGHT",
          perpetual_overcast = "PERPETUAL_OVERCAST",
          dry_seabeds = "DRY_SEABEDS",
          magma_seas = "MAGMA_SEAS",
          supervolcanoes = "SUPERVOLCANOES",
          ash_clouds = "ASH_CLOUDS",
          vast_ruins = "VAST_RUINS",
          mutated_flora = "MUTATED_FLORA",
          terraformed = "TERRAFORMED",
          extreme_temperatures = "EXTREME_TEMPERATURES",
          extreme_pressure = "EXTREME_PRESSURE",
          diverse_life = "DIVERSE_LIFE",
          scarce_life = "SCARCE_LIFE",
          fossils = "FOSSILS",
          weak_gravity = "WEAK_GRAVITY",
          strong_gravity = "STRONG_GRAVITY",
          crushing_gravity = "CRUSHING_GRAVITY",
          toxic_atmosphere = "TOXIC_ATMOSPHERE",
          corrosive_atmosphere = "CORROSIVE_ATMOSPHERE",
          breathable_atmosphere = "BREATHABLE_ATMOSPHERE",
          thin_atmosphere = "THIN_ATMOSPHERE",
          jovian = "JOVIAN",
          rocky = "ROCKY",
          volcanic = "VOLCANIC",
          frozen = "FROZEN",
          swamp = "SWAMP",
          barren = "BARREN",
          temperate = "TEMPERATE",
          jungle = "JUNGLE",
          ocean = "OCEAN",
          radioactive = "RADIOACTIVE",
          micro_gravity_anomalies = "MICRO_GRAVITY_ANOMALIES",
          debris_cluster = "DEBRIS_CLUSTER",
          deep_craters = "DEEP_CRATERS",
          shallow_craters = "SHALLOW_CRATERS",
          unstable_composition = "UNSTABLE_COMPOSITION",
          hollowed_interior = "HOLLOWED_INTERIOR",
          stripped = "STRIPPED",
    
}


/**
 * Ship cargo details.
 */

export type ShipCargo = {
        /**
 * The max number of items that can be stored in the cargo hold.
 */
    capacity: number;
        /**
 * The number of items currently stored in the cargo hold.
 */
    units: number;
        /**
 * The items currently in the cargo hold.
 */
    inventory: ShipCargoItem[];
    
}



export type ShipyardShipCrew = {
        
    required: number;
        
    capacity: number;
    
}

/**
 * 
 */

export type ShipyardShip = {
        
    type: ShipType;
        
    name: string;
        
    purchasePrice: number;
        
    reactor: ShipReactor;
        
    modules: ShipModule[];
        
    mounts: ShipMount[];
        
    crew: ShipyardShipCrew;
        
    description: string;
        
    supply: SupplyLevel;
        
    activity: ActivityLevel;
        
    frame: ShipFrame;
        
    engine: ShipEngine;
    
}

/**
 * Result of a scrap transaction.
 */

export type ScrapTransaction = {
        
    waypointSymbol: WaypointSymbol;
        /**
 * The symbol of the ship.
 */
    shipSymbol: string;
        /**
 * The total price of the transaction.
 */
    totalPrice: number;
        /**
 * The timestamp of the transaction.
 */
    timestamp: string;
    
}

/**
 * The destination or departure of a ships nav route.
 */

export type ShipNavRouteWaypoint = {
        /**
 * Position in the universe in the y axis.
 */
    y: number;
        /**
 * The symbol of the waypoint.
 */
    symbol: string;
        
    type: WaypointType;
        
    systemSymbol: SystemSymbol;
        /**
 * Position in the universe in the x axis.
 */
    x: number;
    
}



export type System = {
        /**
 * Relative position of the system in the sector in the x axis.
 */
    x: number;
        /**
 * Relative position of the system in the sector in the y axis.
 */
    y: number;
        /**
 * Waypoints in this system.
 */
    waypoints: SystemWaypoint[];
        /**
 * Factions that control this system.
 */
    factions: SystemFaction[];
        /**
 * The symbol of the system.
 */
    symbol: string;
        /**
 * The symbol of the sector.
 */
    sectorSymbol: string;
        
    type: SystemType;
    
}

/**
 * The good's symbol.
 */
export enum TradeSymbol {
          precious_stones = "PRECIOUS_STONES",
          quartz_sand = "QUARTZ_SAND",
          silicon_crystals = "SILICON_CRYSTALS",
          ammonia_ice = "AMMONIA_ICE",
          liquid_hydrogen = "LIQUID_HYDROGEN",
          liquid_nitrogen = "LIQUID_NITROGEN",
          ice_water = "ICE_WATER",
          exotic_matter = "EXOTIC_MATTER",
          advanced_circuitry = "ADVANCED_CIRCUITRY",
          graviton_emitters = "GRAVITON_EMITTERS",
          iron = "IRON",
          iron_ore = "IRON_ORE",
          copper = "COPPER",
          copper_ore = "COPPER_ORE",
          aluminum = "ALUMINUM",
          aluminum_ore = "ALUMINUM_ORE",
          silver = "SILVER",
          silver_ore = "SILVER_ORE",
          gold = "GOLD",
          gold_ore = "GOLD_ORE",
          platinum = "PLATINUM",
          platinum_ore = "PLATINUM_ORE",
          diamonds = "DIAMONDS",
          uranite = "URANITE",
          uranite_ore = "URANITE_ORE",
          meritium = "MERITIUM",
          meritium_ore = "MERITIUM_ORE",
          hydrocarbon = "HYDROCARBON",
          antimatter = "ANTIMATTER",
          fab_mats = "FAB_MATS",
          fertilizers = "FERTILIZERS",
          fabrics = "FABRICS",
          food = "FOOD",
          jewelry = "JEWELRY",
          machinery = "MACHINERY",
          firearms = "FIREARMS",
          assault_rifles = "ASSAULT_RIFLES",
          military_equipment = "MILITARY_EQUIPMENT",
          explosives = "EXPLOSIVES",
          lab_instruments = "LAB_INSTRUMENTS",
          ammunition = "AMMUNITION",
          electronics = "ELECTRONICS",
          ship_plating = "SHIP_PLATING",
          ship_parts = "SHIP_PARTS",
          equipment = "EQUIPMENT",
          fuel = "FUEL",
          medicine = "MEDICINE",
          drugs = "DRUGS",
          clothing = "CLOTHING",
          microprocessors = "MICROPROCESSORS",
          plastics = "PLASTICS",
          polynucleotides = "POLYNUCLEOTIDES",
          biocomposites = "BIOCOMPOSITES",
          quantum_stabilizers = "QUANTUM_STABILIZERS",
          nanobots = "NANOBOTS",
          ai_mainframes = "AI_MAINFRAMES",
          quantum_drives = "QUANTUM_DRIVES",
          robotic_drones = "ROBOTIC_DRONES",
          cyber_implants = "CYBER_IMPLANTS",
          gene_therapeutics = "GENE_THERAPEUTICS",
          neural_chips = "NEURAL_CHIPS",
          mood_regulators = "MOOD_REGULATORS",
          viral_agents = "VIRAL_AGENTS",
          micro_fusion_generators = "MICRO_FUSION_GENERATORS",
          supergrains = "SUPERGRAINS",
          laser_rifles = "LASER_RIFLES",
          holographics = "HOLOGRAPHICS",
          ship_salvage = "SHIP_SALVAGE",
          relic_tech = "RELIC_TECH",
          novel_lifeforms = "NOVEL_LIFEFORMS",
          botanical_specimens = "BOTANICAL_SPECIMENS",
          cultural_artifacts = "CULTURAL_ARTIFACTS",
          frame_probe = "FRAME_PROBE",
          frame_drone = "FRAME_DRONE",
          frame_interceptor = "FRAME_INTERCEPTOR",
          frame_racer = "FRAME_RACER",
          frame_fighter = "FRAME_FIGHTER",
          frame_frigate = "FRAME_FRIGATE",
          frame_shuttle = "FRAME_SHUTTLE",
          frame_explorer = "FRAME_EXPLORER",
          frame_miner = "FRAME_MINER",
          frame_light_freighter = "FRAME_LIGHT_FREIGHTER",
          frame_heavy_freighter = "FRAME_HEAVY_FREIGHTER",
          frame_transport = "FRAME_TRANSPORT",
          frame_destroyer = "FRAME_DESTROYER",
          frame_cruiser = "FRAME_CRUISER",
          frame_carrier = "FRAME_CARRIER",
          reactor_solar_i = "REACTOR_SOLAR_I",
          reactor_fusion_i = "REACTOR_FUSION_I",
          reactor_fission_i = "REACTOR_FISSION_I",
          reactor_chemical_i = "REACTOR_CHEMICAL_I",
          reactor_antimatter_i = "REACTOR_ANTIMATTER_I",
          engine_impulse_drive_i = "ENGINE_IMPULSE_DRIVE_I",
          engine_ion_drive_i = "ENGINE_ION_DRIVE_I",
          engine_ion_drive_ii = "ENGINE_ION_DRIVE_II",
          engine_hyper_drive_i = "ENGINE_HYPER_DRIVE_I",
          module_mineral_processor_i = "MODULE_MINERAL_PROCESSOR_I",
          module_gas_processor_i = "MODULE_GAS_PROCESSOR_I",
          module_cargo_hold_i = "MODULE_CARGO_HOLD_I",
          module_cargo_hold_ii = "MODULE_CARGO_HOLD_II",
          module_cargo_hold_iii = "MODULE_CARGO_HOLD_III",
          module_crew_quarters_i = "MODULE_CREW_QUARTERS_I",
          module_envoy_quarters_i = "MODULE_ENVOY_QUARTERS_I",
          module_passenger_cabin_i = "MODULE_PASSENGER_CABIN_I",
          module_micro_refinery_i = "MODULE_MICRO_REFINERY_I",
          module_science_lab_i = "MODULE_SCIENCE_LAB_I",
          module_jump_drive_i = "MODULE_JUMP_DRIVE_I",
          module_jump_drive_ii = "MODULE_JUMP_DRIVE_II",
          module_jump_drive_iii = "MODULE_JUMP_DRIVE_III",
          module_warp_drive_i = "MODULE_WARP_DRIVE_I",
          module_warp_drive_ii = "MODULE_WARP_DRIVE_II",
          module_warp_drive_iii = "MODULE_WARP_DRIVE_III",
          module_shield_generator_i = "MODULE_SHIELD_GENERATOR_I",
          module_shield_generator_ii = "MODULE_SHIELD_GENERATOR_II",
          module_ore_refinery_i = "MODULE_ORE_REFINERY_I",
          module_fuel_refinery_i = "MODULE_FUEL_REFINERY_I",
          mount_gas_siphon_i = "MOUNT_GAS_SIPHON_I",
          mount_gas_siphon_ii = "MOUNT_GAS_SIPHON_II",
          mount_gas_siphon_iii = "MOUNT_GAS_SIPHON_III",
          mount_surveyor_i = "MOUNT_SURVEYOR_I",
          mount_surveyor_ii = "MOUNT_SURVEYOR_II",
          mount_surveyor_iii = "MOUNT_SURVEYOR_III",
          mount_sensor_array_i = "MOUNT_SENSOR_ARRAY_I",
          mount_sensor_array_ii = "MOUNT_SENSOR_ARRAY_II",
          mount_sensor_array_iii = "MOUNT_SENSOR_ARRAY_III",
          mount_mining_laser_i = "MOUNT_MINING_LASER_I",
          mount_mining_laser_ii = "MOUNT_MINING_LASER_II",
          mount_mining_laser_iii = "MOUNT_MINING_LASER_III",
          mount_laser_cannon_i = "MOUNT_LASER_CANNON_I",
          mount_missile_launcher_i = "MOUNT_MISSILE_LAUNCHER_I",
          mount_turret_i = "MOUNT_TURRET_I",
          ship_probe = "SHIP_PROBE",
          ship_mining_drone = "SHIP_MINING_DRONE",
          ship_siphon_drone = "SHIP_SIPHON_DRONE",
          ship_interceptor = "SHIP_INTERCEPTOR",
          ship_light_hauler = "SHIP_LIGHT_HAULER",
          ship_command_frigate = "SHIP_COMMAND_FRIGATE",
          ship_explorer = "SHIP_EXPLORER",
          ship_heavy_freighter = "SHIP_HEAVY_FREIGHTER",
          ship_light_shuttle = "SHIP_LIGHT_SHUTTLE",
          ship_ore_hound = "SHIP_ORE_HOUND",
          ship_refining_freighter = "SHIP_REFINING_FREIGHTER",
          ship_surveyor = "SHIP_SURVEYOR",
    
}


/**
 * The ship's set speed when traveling between waypoints or systems.
 */
export enum ShipNavFlightMode {
          drift = "DRIFT",
          stealth = "STEALTH",
          cruise = "CRUISE",
          burn = "BURN",
    
}


/**
 * A surveyed deposit of a mineral or resource available for extraction.
 */

export type SurveyDeposit = {
        /**
 * The symbol of the deposit.
 */
    symbol: string;
    
}

/**
 * An orbital is another waypoint that orbits a parent waypoint.
 */

export type WaypointOrbital = {
        /**
 * The symbol of the orbiting waypoint.
 */
    symbol: string;
    
}

/**
 * The terms to fulfill the contract.
 */

export type ContractTerms = {
        /**
 * The deadline for the contract.
 */
    deadline: string;
        
    payment: ContractPayment;
        /**
 * The cargo that needs to be delivered to fulfill the contract.
 */
    deliver: ContractDeliverGood[];
    
}

/**
 * Contract details.
 */

export type Contract = {
        /**
 * The time at which the contract is no longer available to be accepted
 */
    deadlineToAccept: string;
        /**
 * ID of the contract.
 */
    id: string;
        /**
 * The symbol of the faction that this contract is for.
 */
    factionSymbol: string;
        /**
 * Type of contract.
 */
    type: string;
        
    terms: ContractTerms;
        /**
 * Whether the contract has been accepted by the agent
 */
    accepted: boolean;
        /**
 * Whether the contract has been fulfilled
 */
    fulfilled: boolean;
        /**
 * Deprecated in favor of deadlineToAccept
 */
    expiration: string;
    
}

/**
 * An object that only shows up when an action has consumed fuel in the process. Shows the fuel consumption data.
 */

export type ShipFuelConsumed = {
        /**
 * The time at which the fuel was consumed.
 */
    timestamp: string;
        /**
 * The amount of fuel consumed by the most recent transit or action.
 */
    amount: number;
    
}

/**
 * Details of the ship's fuel tanks including how much fuel was consumed during the last transit or action.
 */

export type ShipFuel = {
        /**
 * The current amount of fuel in the ship's tanks.
 */
    current: number;
        /**
 * The maximum amount of fuel the ship's tanks can hold.
 */
    capacity: number;
        /**
 * An object that only shows up when an action has consumed fuel in the process. Shows the fuel consumption data.
 */
    consumed: ShipFuelConsumed;
    
}

/**
 * The symbol of the system.
 */


export type SystemSymbol = string;

export type WaypointTrait = {
        
    symbol: WaypointTraitSymbol;
        /**
 * The name of the trait.
 */
    name: string;
        /**
 * A description of the trait.
 */
    description: string;
    
}



export type CreateSurveyJson201ResponseData = {
        
    cooldown: Cooldown;
        /**
 * Surveys created by this action.
 */
    surveys: Survey[];
    
}



export type CreateSurveyJson201Response = {
        
    data: CreateSurveyJson201ResponseData;
    
}



export type ExtractResourcesWithSurveyJson201ResponseData = {
        
    cooldown: Cooldown;
        
    extraction: Extraction;
        
    cargo: ShipCargo;
        
    events: any[];
    
}

/**
 * 
 */

export type ExtractResourcesWithSurveyJson201Response = {
        
    data: ExtractResourcesWithSurveyJson201ResponseData;
    
}



export type JettisonJsonRequest = {
        
    symbol: TradeSymbol;
        /**
 * Amount of units to jettison of this good.
 */
    units: number;
    
}



export type JettisonJson200ResponseData = {
        
    cargo: ShipCargo;
    
}

/**
 * 
 */

export type JettisonJson200Response = {
        
    data: JettisonJson200ResponseData;
    
}



export type PurchaseCargoJsonRequest = {
        
    symbol: TradeSymbol;
        /**
 * Amounts of units to purchase.
 */
    units: number;
    
}



export type PurchaseCargoJson201ResponseData = {
        
    agent: Agent;
        
    cargo: ShipCargo;
        
    transaction: MarketTransaction;
    
}

/**
 * 
 */

export type PurchaseCargoJson201Response = {
        
    data: PurchaseCargoJson201ResponseData;
    
}

/**
 * 
 */

export type GetMountsJson200Response = {
        
    data: ShipMount[];
    
}



export type NavigateShipJsonRequest = {
        /**
 * The target destination.
 */
    waypointSymbol: string;
    
}



export type NavigateShipJson200ResponseData = {
        
    events: any[];
        
    fuel: ShipFuel;
        
    nav: ShipNav;
    
}

/**
 * 
 */

export type NavigateShipJson200Response = {
        
    data: NavigateShipJson200ResponseData;
    
}



export type CreateShipShipScanJson201ResponseData = {
        
    cooldown: Cooldown;
        /**
 * List of scanned ships.
 */
    ships: ScannedShip[];
    
}



export type CreateShipShipScanJson201Response = {
        
    data: CreateShipShipScanJson201ResponseData;
    
}



export type OrbitShipJson200ResponseData = {
        
    nav: ShipNav;
    
}

/**
 * 
 */

export type OrbitShipJson200Response = {
        
    data: OrbitShipJson200ResponseData;
    
}



export type GetScrapShipJson200ResponseData = {
        
    transaction: ScrapTransaction;
    
}

/**
 * 
 */

export type GetScrapShipJson200Response = {
        
    data: GetScrapShipJson200ResponseData;
    
}



export type ScrapShipJson200ResponseData = {
        
    agent: Agent;
        
    transaction: ScrapTransaction;
    
}

/**
 * 
 */

export type ScrapShipJson200Response = {
        
    data: ScrapShipJson200ResponseData;
    
}



export type RepairShipJson200ResponseData = {
        
    agent: Agent;
        
    ship: Ship;
        
    transaction: RepairTransaction;
    
}

/**
 * 
 */

export type RepairShipJson200Response = {
        
    data: RepairShipJson200ResponseData;
    
}



export type GetRepairShipJson200ResponseData = {
        
    transaction: RepairTransaction;
    
}

/**
 * 
 */

export type GetRepairShipJson200Response = {
        
    data: GetRepairShipJson200ResponseData;
    
}



export type PurchaseShipJsonRequest = {
        
    shipType: ShipType;
        /**
 * The symbol of the waypoint you want to purchase the ship at.
 */
    waypointSymbol: string;
    
}



export type PurchaseShipJson201ResponseData = {
        
    agent: Agent;
        
    ship: Ship;
        
    transaction: ShipyardTransaction;
    
}

/**
 * 
 */

export type PurchaseShipJson201Response = {
        
    data: PurchaseShipJson201ResponseData;
    
}

/**
 * 
 */

export type GetMyShipsJson200Response = {
        
    meta: Meta;
        
    data: Ship[];
    
}



export type SiphonResourcesJson201ResponseData = {
        
    cargo: ShipCargo;
        
    events: any[];
        
    cooldown: Cooldown;
        
    siphon: Siphon;
    
}

/**
 * 
 */

export type SiphonResourcesJson201Response = {
        
    data: SiphonResourcesJson201ResponseData;
    
}



export type WarpShipJsonRequest = {
        /**
 * The target destination.
 */
    waypointSymbol: string;
    
}



export type WarpShipJson200ResponseData = {
        
    fuel: ShipFuel;
        
    nav: ShipNav;
    
}

/**
 * 
 */

export type WarpShipJson200Response = {
        
    data: WarpShipJson200ResponseData;
    
}



export type CreateShipSystemScanJson201ResponseData = {
        
    cooldown: Cooldown;
        /**
 * List of scanned systems.
 */
    systems: ScannedSystem[];
    
}



export type CreateShipSystemScanJson201Response = {
        
    data: CreateShipSystemScanJson201ResponseData;
    
}



export type InstallMountJsonRequest = {
        
    symbol: string;
    
}



export type InstallMountJson201ResponseData = {
        
    agent: Agent;
        /**
 * List of installed mounts after the installation of the new mount.
 */
    mounts: ShipMount[];
        
    cargo: ShipCargo;
        
    transaction: ShipModificationTransaction;
    
}



export type InstallMountJson201Response = {
        
    data: InstallMountJson201ResponseData;
    
}

/**
 * 
 */

export type GetMyShipJson200Response = {
        
    data: Ship;
    
}

/**
 * 
 */

export type GetMyShipCargoJson200Response = {
        
    data: ShipCargo;
    
}



export type CreateShipWaypointScanJson201ResponseData = {
        
    cooldown: Cooldown;
        /**
 * List of scanned waypoints.
 */
    waypoints: ScannedWaypoint[];
    
}



export type CreateShipWaypointScanJson201Response = {
        
    data: CreateShipWaypointScanJson201ResponseData;
    
}



export type RefuelShipJsonRequest = {
        /**
 * The amount of fuel to fill in the ship's tanks. When not specified, the ship will be refueled to its maximum fuel capacity. If the amount specified is greater than the ship's remaining capacity, the ship will only be refueled to its maximum fuel capacity. The amount specified is not in market units but in ship fuel units.
 */
    units: number;
        /**
 * Wether to use the FUEL thats in your cargo or not. Default: false
 */
    fromCargo: boolean;
    
}



export type RefuelShipJson200ResponseData = {
        
    fuel: ShipFuel;
        
    transaction: MarketTransaction;
        
    agent: Agent;
    
}

/**
 * 
 */

export type RefuelShipJson200Response = {
        
    data: RefuelShipJson200ResponseData;
    
}

/**
 * 
 */

export type GetShipCooldownJson200Response = {
        
    data: Cooldown;
    
}

/**
 * 
 */

export type GetShipNavJson200Response = {
        
    data: ShipNav;
    
}



export type PatchShipNavJsonRequest = {
        
    flightMode: ShipNavFlightMode;
    
}

/**
 * 
 */

export type PatchShipNavJson200Response = {
        
    data: ShipNav;
    
}



export type NegotiateContractJson201ResponseData = {
        
    contract: Contract;
    
}

/**
 * 
 */

export type NegotiateContractJson201Response = {
        
    data: NegotiateContractJson201ResponseData;
    
}



export type ShipRefineJsonRequest = {
        /**
 * The type of good to produce out of the refining process.
 */
    produce: string;
    
}



export type ShipRefineJson201ResponseDataProduced = {
        /**
 * Symbol of the good.
 */
    tradeSymbol: string;
        /**
 * Amount of units of the good.
 */
    units: number;
    
}



export type ShipRefineJson201ResponseDataConsumed = {
        /**
 * Symbol of the good.
 */
    tradeSymbol: string;
        /**
 * Amount of units of the good.
 */
    units: number;
    
}



export type ShipRefineJson201ResponseData = {
        
    cargo: ShipCargo;
        
    cooldown: Cooldown;
        /**
 * Goods that were produced by this refining process.
 */
    produced: ShipRefineJson201ResponseDataProduced[];
        /**
 * Goods that were consumed during this refining process.
 */
    consumed: ShipRefineJson201ResponseDataConsumed[];
    
}



export type ShipRefineJson201Response = {
        
    data: ShipRefineJson201ResponseData;
    
}



export type DockShipJson200ResponseData = {
        
    nav: ShipNav;
    
}

/**
 * 
 */

export type DockShipJson200Response = {
        
    data: DockShipJson200ResponseData;
    
}



export type ExtractResourcesJsonRequest = {
        
    survey: Survey;
    
}



export type ExtractResourcesJson201ResponseData = {
        
    cooldown: Cooldown;
        
    extraction: Extraction;
        
    cargo: ShipCargo;
        
    events: any[];
    
}

/**
 * 
 */

export type ExtractResourcesJson201Response = {
        
    data: ExtractResourcesJson201ResponseData;
    
}



export type SellCargoJsonRequest = {
        /**
 * Amounts of units to sell of the selected good.
 */
    units: number;
        
    symbol: TradeSymbol;
    
}



export type SellCargoJson201ResponseData = {
        
    cargo: ShipCargo;
        
    transaction: MarketTransaction;
        
    agent: Agent;
    
}

/**
 * 
 */

export type SellCargoJson201Response = {
        
    data: SellCargoJson201ResponseData;
    
}



export type RemoveMountJsonRequest = {
        /**
 * The symbol of the mount to remove.
 */
    symbol: string;
    
}



export type RemoveMountJson201ResponseData = {
        
    transaction: ShipModificationTransaction;
        
    agent: Agent;
        /**
 * List of installed mounts after the removal of the selected mount.
 */
    mounts: ShipMount[];
        
    cargo: ShipCargo;
    
}



export type RemoveMountJson201Response = {
        
    data: RemoveMountJson201ResponseData;
    
}



export type TransferCargoJsonRequest = {
        
    tradeSymbol: TradeSymbol;
        /**
 * Amount of units to transfer.
 */
    units: number;
        /**
 * The symbol of the ship to transfer to.
 */
    shipSymbol: string;
    
}



export type TransferCargoJson200ResponseData = {
        
    cargo: ShipCargo;
    
}



export type TransferCargoJson200Response = {
        
    data: TransferCargoJson200ResponseData;
    
}



export type CreateChartJson201ResponseData = {
        
    chart: Chart;
        
    waypoint: Waypoint;
    
}



export type CreateChartJson201Response = {
        
    data: CreateChartJson201ResponseData;
    
}



export type JumpShipJsonRequest = {
        /**
 * The symbol of the waypoint to jump to. The destination must be a connected waypoint.
 */
    waypointSymbol: string;
    
}



export type JumpShipJson200ResponseData = {
        
    nav: ShipNav;
        
    cooldown: Cooldown;
        
    transaction: MarketTransaction;
        
    agent: Agent;
    
}

/**
 * 
 */

export type JumpShipJson200Response = {
        
    data: JumpShipJson200ResponseData;
    
}

/**
 * 
 */

export type GetSystemJson200Response = {
        
    data: System;
    
}

/**
 * 
 */

export type GetJumpGateJson200Response = {
        
    data: JumpGate;
    
}

/**
 * 
 */

export type GetSystemsJson200Response = {
        
    data: System[];
        
    meta: Meta;
    
}



export type SupplyConstructionJsonRequest = {
        /**
 * Symbol of the ship to use.
 */
    shipSymbol: string;
        /**
 * The symbol of the good to supply.
 */
    tradeSymbol: string;
        /**
 * Amount of units to supply.
 */
    units: number;
    
}



export type SupplyConstructionJson201ResponseData = {
        
    construction: Construction;
        
    cargo: ShipCargo;
    
}

/**
 * 
 */

export type SupplyConstructionJson201Response = {
        
    data: SupplyConstructionJson201ResponseData;
    
}

/**
 * 
 */

export type GetSystemWaypointsJson200Response = {
        
    data: Waypoint[];
        
    meta: Meta;
    
}

/**
 * 
 */

export type GetConstructionJson200Response = {
        
    data: Construction;
    
}

/**
 * 
 */

export type GetShipyardJson200Response = {
        
    data: Shipyard;
    
}



export type GetMarketJson200Response = {
        
    data: Market;
    
}

/**
 * 
 */

export type GetWaypointJson200Response = {
        
    data: Waypoint;
    
}



export type DeliverContractJsonRequest = {
        /**
 * The symbol of the good to deliver.
 */
    tradeSymbol: string;
        /**
 * Amount of units to deliver.
 */
    units: number;
        /**
 * Symbol of a ship located in the destination to deliver a contract and that has a good to deliver in its cargo.
 */
    shipSymbol: string;
    
}



export type DeliverContractJson200ResponseData = {
        
    contract: Contract;
        
    cargo: ShipCargo;
    
}

/**
 * 
 */

export type DeliverContractJson200Response = {
        
    data: DeliverContractJson200ResponseData;
    
}

/**
 * 
 */

export type GetContractsJson200Response = {
        
    data: Contract[];
        
    meta: Meta;
    
}



export type AcceptContractJson200ResponseData = {
        
    agent: Agent;
        
    contract: Contract;
    
}



export type AcceptContractJson200Response = {
        
    data: AcceptContractJson200ResponseData;
    
}



export type FulfillContractJson200ResponseData = {
        
    agent: Agent;
        
    contract: Contract;
    
}

/**
 * 
 */

export type FulfillContractJson200Response = {
        
    data: FulfillContractJson200ResponseData;
    
}



export type GetContractJson200Response = {
        
    data: Contract;
    
}



export type GetFactionsJson200Response = {
        
    data: Faction[];
        
    meta: Meta;
    
}



export type GetFactionJson200Response = {
        
    data: Faction;
    
}



export type GetMyAgentJson200Response = {
        
    data: Agent;
    
}



export type GetAgentsJson200Response = {
        
    data: Agent[];
        
    meta: Meta;
    
}



export type GetAgentJson200Response = {
        
    data: Agent;
    
}



export type RegisterJsonRequest = {
        
    faction: FactionSymbol;
        /**
 * Your desired agent symbol. This will be a unique name used to represent your agent, and will be the prefix for your ships.
 */
    symbol: string;
        /**
 * Your email address. This is used if you reserved your call sign between resets.
 */
    email: string;
    
}



export type RegisterJson201ResponseData = {
        
    agent: Agent;
        
    contract: Contract;
        
    faction: Faction;
        
    ship: Ship;
        /**
 * A Bearer token for accessing secured API endpoints.
 */
    token: string;
    
}



export type RegisterJson201Response = {
        
    data: RegisterJson201ResponseData;
    
}



export type GetStatusJson200ResponseStats = {
        /**
 * Total number of waypoints in the game.
 */
    waypoints: number;
        /**
 * Number of registered agents in the game.
 */
    agents: number;
        /**
 * Total number of ships in the game.
 */
    ships: number;
        /**
 * Total number of systems in the game.
 */
    systems: number;
    
}



export type GetStatusJson200ResponseServerResets = {
        /**
 * The date and time when the game server will reset.
 */
    next: string;
        /**
 * How often we intend to reset the game server.
 */
    frequency: string;
    
}



export type GetStatusJson200ResponseLinks = {
        
    name: string;
        
    url: string;
    
}



export type GetStatusJson200ResponseLeaderboardsMostCredits = {
        /**
 * Symbol of the agent.
 */
    agentSymbol: string;
        /**
 * Amount of credits.
 */
    credits: number;
    
}



export type GetStatusJson200ResponseLeaderboardsMostSubmittedCharts = {
        /**
 * Symbol of the agent.
 */
    agentSymbol: string;
        /**
 * Amount of charts done by the agent.
 */
    chartCount: number;
    
}



export type GetStatusJson200ResponseLeaderboards = {
        /**
 * Top agents with the most credits.
 */
    mostCredits: GetStatusJson200ResponseLeaderboardsMostCredits[];
        /**
 * Top agents with the most charted submitted.
 */
    mostSubmittedCharts: GetStatusJson200ResponseLeaderboardsMostSubmittedCharts[];
    
}



export type GetStatusJson200ResponseAnnouncements = {
        
    title: string;
        
    body: string;
    
}



export type GetStatusJson200Response = {
        /**
 * The date when the game server was last reset.
 */
    resetDate: string;
        
    description: string;
        
    stats: GetStatusJson200ResponseStats;
        
    serverResets: GetStatusJson200ResponseServerResets;
        
    links: GetStatusJson200ResponseLinks[];
        /**
 * The current version of the API.
 */
    version: string;
        
    leaderboards: GetStatusJson200ResponseLeaderboards;
        
    announcements: GetStatusJson200ResponseAnnouncements[];
        /**
 * The current status of the game server.
 */
    status: string;
    
}



type QueryParams = Record<
    string, 
    string | number | boolean | string[] | boolean[] | number[] | undefined | null
>;

const populatePathTemplate = (
  template: string,
  properties: Record<string, any>
): string => {
  for (const k of Object.keys(properties)) {
    template = template.replace(`{${k}}`, encodeURIComponent(properties[k]));
  }

  return template;
};

type RequestBuilder<T> = {
  withPath: (r: Record<string, string>) => RequestBuilder<T>;
  withQuery: (q: QueryParams) => RequestBuilder<T>;
  withConfig: (c?: Partial<RequestConfig>) => RequestBuilder<T>;
  withBody: (b: any) => RequestBuilder<T>;
  withResponseMap: (m: any) => RequestBuilder<T>;
  send: (c: Configuration, f: Fetch) => Promise<T>;
};
const request = <T>(
  method: string,
  routeTemplate: string
): RequestBuilder<T> => {
  let config: InternalRequestConfig = {
    url: BASE_PATH + routeTemplate,
    config: {
      method,
    },
  };
  let query: QueryParams | null = null;
  let known: number[] = [];

  const builder = {
    withPath,
    withQuery,
    withConfig,
    withBody,
    withResponseMap,
    send,
  };

  return builder;

  function withPath(r: Record<string, string>) {
    config.url = populatePathTemplate(config.url, r);
    return builder;
  }
  function withQuery(r: QueryParams) {
    query = r;
    return builder;
  }
  function withConfig(c?: Partial<RequestConfig>) {
    config.config = {
      ...config.config,
      ...c,
    };
    return builder;
  }
  function withBody(b: any) {
    config.config.body = JSON.stringify(b);

    return builder;
  }
  function withResponseMap(responses: number[]) {
    known = responses;
    return builder;
  }
  async function send<T>(c: Configuration, f: Fetch): Promise<T> {
    const u = url.parse(config.url, true);
    u.query = {
      ...u.query,
      ...(query as any),
    };

    const response = await f(url.format(u), {
        ...config.config
    });

    if (!known.includes(response.status)) {
        // Throw an error unless a default error is known
    }

    return await response.json();
  }
};

// Apis
const endpoints = (c: Configuration, f: Fetch) => ({
/**
 * Register New Agent
 */
    register: (body: RegisterJsonRequest,  config?: RequestConfig) => 
      request<RegisterJson201Response>('POST', '/register')
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  /**
 * Get Status
 */
    getStatus: ( config?: RequestConfig) => 
      request<GetStatusJson200Response>('GET', '/')
        .withConfig(config)
        .send(c, f),
  
fleet: {
/**
 * Create Survey
 */
    createSurvey: (shipSymbol: string,  config?: RequestConfig) => 
      request<CreateSurveyJson201Response>('POST', '/my/ships/{shipSymbol}/survey')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Extract Resources with Survey
 */
    extractResourcesWithSurvey: (body: Survey, shipSymbol: string,  config?: RequestConfig) => 
      request<ExtractResourcesWithSurveyJson201Response>('POST', '/my/ships/{shipSymbol}/extract/survey')
        .withPath({ shipSymbol,  })
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  /**
 * Jettison Cargo
 */
    jettison: (body: JettisonJsonRequest, shipSymbol: string,  config?: RequestConfig) => 
      request<JettisonJson200Response>('POST', '/my/ships/{shipSymbol}/jettison')
        .withPath({ shipSymbol,  })
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  /**
 * Purchase Cargo
 */
    purchaseCargo: (body: PurchaseCargoJsonRequest, shipSymbol: string,  config?: RequestConfig) => 
      request<PurchaseCargoJson201Response>('POST', '/my/ships/{shipSymbol}/purchase')
        .withPath({ shipSymbol,  })
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  /**
 * Get Mounts
 */
    getMounts: (shipSymbol: string,  config?: RequestConfig) => 
      request<GetMountsJson200Response>('GET', '/my/ships/{shipSymbol}/mounts')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Navigate Ship
 */
    navigateShip: (body: NavigateShipJsonRequest, shipSymbol: string,  config?: RequestConfig) => 
      request<NavigateShipJson200Response>('POST', '/my/ships/{shipSymbol}/navigate')
        .withPath({ shipSymbol,  })
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  /**
 * Scan Ships
 */
    createShipShipScan: (shipSymbol: string,  config?: RequestConfig) => 
      request<CreateShipShipScanJson201Response>('POST', '/my/ships/{shipSymbol}/scan/ships')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Orbit Ship
 */
    orbitShip: (shipSymbol: string,  config?: RequestConfig) => 
      request<OrbitShipJson200Response>('POST', '/my/ships/{shipSymbol}/orbit')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Get Scrap Ship
 */
    getScrapShip: (shipSymbol: string,  config?: RequestConfig) => 
      request<GetScrapShipJson200Response>('GET', '/my/ships/{shipSymbol}/scrap')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Scrap Ship
 */
    scrapShip: (shipSymbol: string,  config?: RequestConfig) => 
      request<ScrapShipJson200Response>('POST', '/my/ships/{shipSymbol}/scrap')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Repair Ship
 */
    repairShip: (shipSymbol: string,  config?: RequestConfig) => 
      request<RepairShipJson200Response>('POST', '/my/ships/{shipSymbol}/repair')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Get Repair Ship
 */
    getRepairShip: (shipSymbol: string,  config?: RequestConfig) => 
      request<GetRepairShipJson200Response>('GET', '/my/ships/{shipSymbol}/repair')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Purchase Ship
 */
    purchaseShip: (body: PurchaseShipJsonRequest,  config?: RequestConfig) => 
      request<PurchaseShipJson201Response>('POST', '/my/ships')
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  /**
 * List Ships
 */
    getMyShips: (page?: number, limit?: number,  config?: RequestConfig) => 
      request<GetMyShipsJson200Response>('GET', '/my/ships')
        .withQuery({ page: page ?? 1, limit: limit ?? 10,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Siphon Resources
 */
    siphonResources: (shipSymbol: string,  config?: RequestConfig) => 
      request<SiphonResourcesJson201Response>('POST', '/my/ships/{shipSymbol}/siphon')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Warp Ship
 */
    warpShip: (body: WarpShipJsonRequest, shipSymbol: string,  config?: RequestConfig) => 
      request<WarpShipJson200Response>('POST', '/my/ships/{shipSymbol}/warp')
        .withPath({ shipSymbol,  })
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  /**
 * Scan Systems
 */
    createShipSystemScan: (shipSymbol: string,  config?: RequestConfig) => 
      request<CreateShipSystemScanJson201Response>('POST', '/my/ships/{shipSymbol}/scan/systems')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Install Mount
 */
    installMount: (body: InstallMountJsonRequest, shipSymbol: string,  config?: RequestConfig) => 
      request<InstallMountJson201Response>('POST', '/my/ships/{shipSymbol}/mounts/install')
        .withPath({ shipSymbol,  })
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  /**
 * Get Ship
 */
    getMyShip: (shipSymbol: string,  config?: RequestConfig) => 
      request<GetMyShipJson200Response>('GET', '/my/ships/{shipSymbol}')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Get Ship Cargo
 */
    getMyShipCargo: (shipSymbol: string,  config?: RequestConfig) => 
      request<GetMyShipCargoJson200Response>('GET', '/my/ships/{shipSymbol}/cargo')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Scan Waypoints
 */
    createShipWaypointScan: (shipSymbol: string,  config?: RequestConfig) => 
      request<CreateShipWaypointScanJson201Response>('POST', '/my/ships/{shipSymbol}/scan/waypoints')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Refuel Ship
 */
    refuelShip: (body: RefuelShipJsonRequest, shipSymbol: string,  config?: RequestConfig) => 
      request<RefuelShipJson200Response>('POST', '/my/ships/{shipSymbol}/refuel')
        .withPath({ shipSymbol,  })
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  /**
 * Get Ship Cooldown
 */
    getShipCooldown: (shipSymbol: string,  config?: RequestConfig) => 
      request<GetShipCooldownJson200Response>('GET', '/my/ships/{shipSymbol}/cooldown')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Get Ship Nav
 */
    getShipNav: (shipSymbol: string,  config?: RequestConfig) => 
      request<GetShipNavJson200Response>('GET', '/my/ships/{shipSymbol}/nav')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Patch Ship Nav
 */
    patchShipNav: (body: PatchShipNavJsonRequest, shipSymbol: string,  config?: RequestConfig) => 
      request<PatchShipNavJson200Response>('PATCH', '/my/ships/{shipSymbol}/nav')
        .withPath({ shipSymbol,  })
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  /**
 * Negotiate Contract
 */
    negotiateContract: (shipSymbol: string,  config?: RequestConfig) => 
      request<NegotiateContractJson201Response>('POST', '/my/ships/{shipSymbol}/negotiate/contract')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Ship Refine
 */
    shipRefine: (body: ShipRefineJsonRequest, shipSymbol: string,  config?: RequestConfig) => 
      request<ShipRefineJson201Response>('POST', '/my/ships/{shipSymbol}/refine')
        .withPath({ shipSymbol,  })
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  /**
 * Dock Ship
 */
    dockShip: (shipSymbol: string,  config?: RequestConfig) => 
      request<DockShipJson200Response>('POST', '/my/ships/{shipSymbol}/dock')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Extract Resources
 */
    extractResources: (body: ExtractResourcesJsonRequest, shipSymbol: string,  config?: RequestConfig) => 
      request<ExtractResourcesJson201Response>('POST', '/my/ships/{shipSymbol}/extract')
        .withPath({ shipSymbol,  })
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  /**
 * Sell Cargo
 */
    sellCargo: (body: SellCargoJsonRequest, shipSymbol: string,  config?: RequestConfig) => 
      request<SellCargoJson201Response>('POST', '/my/ships/{shipSymbol}/sell')
        .withPath({ shipSymbol,  })
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  /**
 * Remove Mount
 */
    removeMount: (body: RemoveMountJsonRequest, shipSymbol: string,  config?: RequestConfig) => 
      request<RemoveMountJson201Response>('POST', '/my/ships/{shipSymbol}/mounts/remove')
        .withPath({ shipSymbol,  })
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  /**
 * Transfer Cargo
 */
    transferCargo: (body: TransferCargoJsonRequest, shipSymbol: string,  config?: RequestConfig) => 
      request<TransferCargoJson200Response>('POST', '/my/ships/{shipSymbol}/transfer')
        .withPath({ shipSymbol,  })
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  /**
 * Create Chart
 */
    createChart: (shipSymbol: string,  config?: RequestConfig) => 
      request<CreateChartJson201Response>('POST', '/my/ships/{shipSymbol}/chart')
        .withPath({ shipSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Jump Ship
 */
    jumpShip: (body: JumpShipJsonRequest, shipSymbol: string,  config?: RequestConfig) => 
      request<JumpShipJson200Response>('POST', '/my/ships/{shipSymbol}/jump')
        .withPath({ shipSymbol,  })
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  },
systems: {
/**
 * Get System
 */
    getSystem: (systemSymbol: string,  config?: RequestConfig) => 
      request<GetSystemJson200Response>('GET', '/systems/{systemSymbol}')
        .withPath({ systemSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Get Jump Gate
 */
    getJumpGate: (systemSymbol: string, waypointSymbol: string,  config?: RequestConfig) => 
      request<GetJumpGateJson200Response>('GET', '/systems/{systemSymbol}/waypoints/{waypointSymbol}/jump-gate')
        .withPath({ systemSymbol, waypointSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * List Systems
 */
    getSystems: (page?: number, limit?: number,  config?: RequestConfig) => 
      request<GetSystemsJson200Response>('GET', '/systems')
        .withQuery({ page: page ?? 1, limit: limit ?? 10,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Supply Construction Site
 */
    supplyConstruction: (body: SupplyConstructionJsonRequest, systemSymbol: string, waypointSymbol: string,  config?: RequestConfig) => 
      request<SupplyConstructionJson201Response>('POST', '/systems/{systemSymbol}/waypoints/{waypointSymbol}/construction/supply')
        .withPath({ systemSymbol, waypointSymbol,  })
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  /**
 * List Waypoints in System
 */
    getSystemWaypoints: (systemSymbol: string, page?: number, limit?: number, type?: WaypointType, traits?: any,  config?: RequestConfig) => 
      request<GetSystemWaypointsJson200Response>('GET', '/systems/{systemSymbol}/waypoints')
        .withPath({ systemSymbol,  })
        .withQuery({ page: page ?? 1, limit: limit ?? 10, type, traits,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Get Construction Site
 */
    getConstruction: (systemSymbol: string, waypointSymbol: string,  config?: RequestConfig) => 
      request<GetConstructionJson200Response>('GET', '/systems/{systemSymbol}/waypoints/{waypointSymbol}/construction')
        .withPath({ systemSymbol, waypointSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Get Shipyard
 */
    getShipyard: (systemSymbol: string, waypointSymbol: string,  config?: RequestConfig) => 
      request<GetShipyardJson200Response>('GET', '/systems/{systemSymbol}/waypoints/{waypointSymbol}/shipyard')
        .withPath({ systemSymbol, waypointSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Get Market
 */
    getMarket: (systemSymbol: string, waypointSymbol: string,  config?: RequestConfig) => 
      request<GetMarketJson200Response>('GET', '/systems/{systemSymbol}/waypoints/{waypointSymbol}/market')
        .withPath({ systemSymbol, waypointSymbol,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Get Waypoint
 */
    getWaypoint: (systemSymbol: string, waypointSymbol: string,  config?: RequestConfig) => 
      request<GetWaypointJson200Response>('GET', '/systems/{systemSymbol}/waypoints/{waypointSymbol}')
        .withPath({ systemSymbol, waypointSymbol,  })
        .withConfig(config)
        .send(c, f),
  },
contracts: {
/**
 * Deliver Cargo to Contract
 */
    deliverContract: (body: DeliverContractJsonRequest, contractId: string,  config?: RequestConfig) => 
      request<DeliverContractJson200Response>('POST', '/my/contracts/{contractId}/deliver')
        .withPath({ contractId,  })
        .withBody(body)
        .withConfig(config)
        .send(c, f),
  /**
 * List Contracts
 */
    getContracts: (page?: number, limit?: number,  config?: RequestConfig) => 
      request<GetContractsJson200Response>('GET', '/my/contracts')
        .withQuery({ page: page ?? 1, limit: limit ?? 10,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Accept Contract
 */
    acceptContract: (contractId: string,  config?: RequestConfig) => 
      request<AcceptContractJson200Response>('POST', '/my/contracts/{contractId}/accept')
        .withPath({ contractId,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Fulfill Contract
 */
    fulfillContract: (contractId: string,  config?: RequestConfig) => 
      request<FulfillContractJson200Response>('POST', '/my/contracts/{contractId}/fulfill')
        .withPath({ contractId,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Get Contract
 */
    getContract: (contractId: string,  config?: RequestConfig) => 
      request<GetContractJson200Response>('GET', '/my/contracts/{contractId}')
        .withPath({ contractId,  })
        .withConfig(config)
        .send(c, f),
  },
factions: {
/**
 * List Factions
 */
    getFactions: (page?: number, limit?: number,  config?: RequestConfig) => 
      request<GetFactionsJson200Response>('GET', '/factions')
        .withQuery({ page: page ?? 1, limit: limit ?? 10,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Get Faction
 */
    getFaction: (factionSymbol: string,  config?: RequestConfig) => 
      request<GetFactionJson200Response>('GET', '/factions/{factionSymbol}')
        .withPath({ factionSymbol,  })
        .withConfig(config)
        .send(c, f),
  },
agents: {
/**
 * Get Agent
 */
    getMyAgent: ( config?: RequestConfig) => 
      request<GetMyAgentJson200Response>('GET', '/my/agent')
        .withConfig(config)
        .send(c, f),
  /**
 * List Agents
 */
    getAgents: (page?: number, limit?: number,  config?: RequestConfig) => 
      request<GetAgentsJson200Response>('GET', '/agents')
        .withQuery({ page: page ?? 1, limit: limit ?? 10,  })
        .withConfig(config)
        .send(c, f),
  /**
 * Get Public Agent
 */
    getAgent: (agentSymbol: string,  config?: RequestConfig) => 
      request<GetAgentJson200Response>('GET', '/agents/{agentSymbol}')
        .withPath({ agentSymbol,  })
        .withConfig(config)
        .send(c, f),
  },
});