// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { User } from '../users/user.entity'; // Assuming the user entity exists

// @Entity('device_tokens')
// export class DeviceToken {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ManyToOne(() => User, (user) => user.deviceTokens)
//   user: User; // The user associated with this device token

//   @Column()
//   device_token: string; // The device token for push notifications

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   created_at: Date; // Timestamp of when the device token was registered
// }
