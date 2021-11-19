import React from "react";
import './team.css'
import adminIco from './assets/adminIco.svg'
import userIco from './assets/userIco.svg'
import rightArrow from './assets/rightArrow.svg'

const jsonTeam = [
    {
        id: 1,
        status: "approved",
        user: {
            id: 101,
            name: "Bob",
            lastName: "Weather",
            phone: "00354875468",
            email: "bobisinsane@gmail.com"
        },
        role: "Administrator"
    },
    {
        id: 2,
        status: "approved",
        user: {
            id: 102,
            name: "Bobsky",
            lastName: "Tony",
            phone: "00354875468",
            email: "instance@gmail.com"
        },
        role: "Administrator"
    },
    {
        id: 6,
        status: "invited",
        user: {
            id: -1,
            name: '',
            lastName: '',
            phone: '',
            email: ''
        },
        role: "Administrator"
    },
    {
        id: 11,
        status: "approved",
        user: {
            id: 111,
            name: "Bob",
            lastName: "Reony",
            phone: "00354875468",
            email: "bobisinsane@gmail.com"
        },
        role: "Standard"
    },
    {
        id: 12,
        status: "approved",
        user: {
            id: 1313,
            name: "Bob",
            lastName: "Morni",
            phone: "00354875468",
            email: "bobisinsane@gmail.com"
        },
        role: "Standard"
    },
    {
        id: 13,
        status: "approved",
        user: {
            id: 113,
            name: "Joseph",
            lastName: "Bloggs",
            phone: "00354875468",
            email: "bobisinsane@gmail.com"
        },
        role: "Standard"
    },
    {
        id: 11,
        status: "approved",
        user: {
            id: 1114,
            name: "Bob",
            lastName: "Instar",
            phone: "00354875468",
            email: "bobisinsane@gmail.com"
        },
        role: "Standard"
    },
    {
        id: 5,
        status: "approved",
        user: {
            id: 115,
            name: "Joseph",
            lastName: "Bloggs",
            phone: "00354875468",
            email: "bobisinsane@gmail.com"
        },
        role: "Standard"
    },
    {
        id: 6,
        status: "approved",
        user: {
            id: 116,
            name: "Sarah",
            lastName: "Connors",
            phone: "00354875468",
            email: "bobisinsane@gmail.com"
        },
        role: "Standard"
    },
    {
        id: 7,
        status: "approved",
        user: {
            id: 117,
            name: "Mathew",
            lastName: "Murphy",
            phone: "00354875468",
            email: "bobisinsane@gmail.com"
        },
        role: "Standard"
    }
]
const jsonInvite = [
    {
        id: 6,
        phone: "00354875468",
        role: "Administrator"
    }
]


type Role = "Administrator" | "Standard";
type Status = "request" | "pending" | "approved" | "declined" | "invited";

interface TeamMember {
    id: number;
    status: Status;
    user: UserShortData;
    role: Role;
}

interface UserShortData {
    id: number;
    name: string;
    lastName: string;
    phone: string;
    email: string;
}

interface Invite {
    id: number;
    phone: string;
    role: Role;
}

const User = ({id, status, user, role}: TeamMember) => {
    const { name, lastName, phone, email } = user
    const card = (
        <div className={'card'}>
            {status === 'approved' ?
             <PrintUserShortData id={user.id} name={name} lastName={lastName} phone={phone} email={email} /> :
            <div className={'invited-users'}>
                <InvitedUsers id={id} phone={phone} role={role}/>
                <div className={'user-status'}>{status}</div>
            </div>}
            <img src={rightArrow} alt="" />
        </div>
    )
    return card
}

const PrintUserShortData = ({id, name, lastName, phone, email}: UserShortData) => {
    return <div>{`${name} ${lastName}`}</div>
}

const InvitedUsers = ({id, phone, role}: Invite) => {
    return <div className={'phone-number'}>{phone}</div>
}
// jsonTeam, // jsonInvite
const Team = () => {
    const adminUsers: JSX.Element[] = []
    const standardUsers: JSX.Element[] = []
        jsonTeam.forEach(member => {
            const { id, status, user, role } = member
                const userStat: string = status;
                const stat: Status = userStat as Status
                const userRole: string = role
                const usrRole: Role = userRole as Role
            if (stat === 'approved') {
                if (usrRole === 'Administrator') 
                adminUsers.push(<User id={id} status={stat} user={user} role={usrRole}/>)
                if(usrRole === 'Standard')
                    standardUsers.push(<User id={id} status={stat} user={user} role={usrRole}/>)
            } else {
                jsonInvite.forEach(member => {
                    if (id === member.id) {
                        const { id, phone, role } = member
                        const userRole: string = role
                        const usrRole: Role = userRole as Role
                        user.phone = phone
                        if (usrRole === 'Administrator') 
                            adminUsers.push(<User id={id} status={stat} user={user} role={usrRole}/>)
                        if(usrRole === 'Standard')
                            standardUsers.push(<User id={id} status={stat} user={user} role={usrRole}/>)
                    }
                })
            }
        })
    const printAdmin = adminUsers.map(user => user)
    const printStandard = standardUsers.map(user => user)
    const collection = (userRole: String, printUser: JSX.Element[], icon: string) => {
        return <div className={`${userRole}-user-collection`}>
                    <div className="title">
                        <img src={icon} alt={`${userRole}-user-icon`} />
                        {userRole === 'admin' ? 'Administrators' : 'Standard Users'}
                    </div>
                    <div className="user-collection">
                        {printUser}
                    </div>
                </div>
    } 
    return <div className={'team-collection'}>
                {collection('admin', printAdmin, adminIco)}
                {collection('standard', printStandard, userIco)}
            </div>
}

export default Team