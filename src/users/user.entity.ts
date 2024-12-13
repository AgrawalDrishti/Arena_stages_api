// import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// import { DeviceToken } from '../notifications/device-token.entity'; // Import DeviceToken for relationship
// import { Notification } from '../notifications/notification.entity'; // Import Notification for relationship

// @Entity('users')
// export class User {
//   @PrimaryGeneratedColumn('uuid')
//   user_id: string; // Unique identifier for the user

//   @Column({ unique: true })
//   username: string; // User's username

//   @Column({ unique: true })
//   email: string; // User's email

//   @Column()
//   password: string; // User's password (should be hashed)

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   created_at: Date; // Timestamp when the user was created

//   // Relationships with notifications (User can have many notifications)
//   @OneToMany(() => Notification, (notification) => notification.user)
//   notifications: Notification[];

//   // Relationships with device tokens (User can register multiple device tokens)
//   @OneToMany(() => DeviceToken, (deviceToken) => deviceToken.user)
//   deviceTokens: DeviceToken[];
// }
