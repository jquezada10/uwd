BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Roles] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Role] NVARCHAR(50),
    CONSTRAINT [PK__Roles__3214EC07EED6691E] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[UserRoles] (
    [UserId] INT NOT NULL,
    [RoleId] INT NOT NULL,
    CONSTRAINT [PK__UserRole__AF2760AD041D9C5F] PRIMARY KEY CLUSTERED ([UserId],[RoleId])
);

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [Name] NVARCHAR(50),
    [ActiveDirectoryEmail] NVARCHAR(50),
    [ParadigmUsername] NVARCHAR(50),
    [ParadigmGuid] UNIQUEIDENTIFIER,
    [Username] NVARCHAR(50),
    [Password] NVARCHAR(50),
    [IsDisabled] BIT,
    [Language] NVARCHAR(50),
    [Theme] NVARCHAR(50),
    CONSTRAINT [PK__Users__3214EC077186B9E6] PRIMARY KEY CLUSTERED ([Id])
);

-- CreateTable
CREATE TABLE [dbo].[BackorderFile] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [BackorderFile_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [closed] BIT NOT NULL CONSTRAINT [BackorderFile_closed_df] DEFAULT 0,
    [codeBckOrd] NVARCHAR(1000) NOT NULL,
    [scheduleId] INT NOT NULL,
    [unitId] INT NOT NULL,
    [orderId] INT NOT NULL,
    [reasonId] INT,
    [noteUser] NVARCHAR(1000),
    [expectedDate] DATETIME2,
    [newDateClient] DATETIME2,
    [usernameUser] NVARCHAR(1000),
    CONSTRAINT [BackorderFile_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [BackorderFile_codeBckOrd_key] UNIQUE NONCLUSTERED ([codeBckOrd])
);

-- AddForeignKey
ALTER TABLE [dbo].[UserRoles] ADD CONSTRAINT [FK__UserRoles__RoleI__02FC7413] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[UserRoles] ADD CONSTRAINT [FK__UserRoles__UserI__02084FDA] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

