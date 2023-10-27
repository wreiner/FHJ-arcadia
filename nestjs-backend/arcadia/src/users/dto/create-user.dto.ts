import { IsNotEmpty, Length, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Please enter a username' })
  @IsString({
    message:
      'Only alphanumerical characters and numbers are allowed in the username field',
  })
  @Length(3, 20, {
    message: 'Username length must be between 3 and 20 charcters',
  })
  @Matches('^[a-zA-Z0-9]+$', '', {
    message:
      'Only alphanumerical characters and numbers are allowed in the username field',
  })
  //   @Matches('^\\S+$', '', { message: 'Spaces are not allowed in the username' })
  name: string;
}
