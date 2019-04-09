# Design Document

### ArcCore

#### Core

##### ArcObject
 - `public readonly constructor(): ArcObject` *class constructor*
 - `public readonly uuid: string` *contains unique identifier*
 - `public readonly isArcObject: boolean = true` *used to quickly determine if class object is or is instance of ArcObject* 

##### Scene *extends* ArcObject
 - `public readonly constructor(): Scene`
 - `public readonly isScene: boolean = true`
 - `public readonly entities: Entity[] = []`

##### Entity *extends* ArcObject
 - `public readonly constructor(): Entity`
 - `public readonly isEntity: boolean = true`
 - `public readonly components: Component[] = []`
 - `protected parent: Scene`

##### Component *extends* ArcObject
 - `public readonly constructor(): Component`
 - `public readonly isComponent: boolean = true`
 - `protected parent: Entity`

##### Instance *extends* ArcObject
 - `public readonly constructor(): Instance` *class constructor*
 - `public readonly isInstance: boolean = true` *used to quickly determine if class object is or is instance of Instance*
 - `public readonly Modules: Module[] = []` *contains a list of all enabled modules*
 - `public readonly Scenes: Scene[] = []` *contains a list of loaded scenes*

##### Module *extends* ArcObject
 - `public readonly constructor(type: string): Module` *class constructor*
 - `public readonly isModule: boolean = true` *used to quickly determine if class object is or is instance of Module*
 - `public readonly type: string` *used to identify which thread this Module should be handled by*
 - `public readonly components = Component[]` *contains a list of components this Module operates on*
 - `public readonly entities = Entity[]` *contains a list of entities that contain components listed in `this.components`*