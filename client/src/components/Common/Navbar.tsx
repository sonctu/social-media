import { FC, useContext, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '~/contexts/AppContext';
import instagram from '../../assets/instagram.png';
import BarIcon from '../Icons/BarIcon';
import ExploreIcon from '../Icons/ExploreIcon';
import HeartIcon from '../Icons/HeartIcon';
import HomeIcon from '../Icons/HomeIcon';
import Messenger from '../Icons/Messenger';
import PlusIcon from '../Icons/PlusIcon';
import SearchIcon from '../Icons/SearchIcon';
import Search from '../Search/Search';
import Avatar from './Avatar';

const Navbar: FC = () => {
  const { currentUser } = useContext(AppContext);
  const navbarList = useMemo(
    () => [
      {
        content: 'Home',
        icon: <HomeIcon></HomeIcon>,
        active: <HomeIcon color='#0095f6'></HomeIcon>,
        link: '/',
      },
      {
        content: 'Search',
        icon: <SearchIcon width='24' height='24'></SearchIcon>,
        active: <SearchIcon width='24' height='24' color='#0095f6'></SearchIcon>,
        link: '/search',
      },
      {
        content: 'Explore',
        icon: <ExploreIcon></ExploreIcon>,
        active: <ExploreIcon color='#0095f6'></ExploreIcon>,
        link: '/explore',
      },
      {
        content: 'Messenger',
        icon: <Messenger></Messenger>,
        active: <Messenger color='#0095f6'></Messenger>,
        link: '/direct/inbox',
      },
      {
        content: 'Notifications',
        icon: <HeartIcon></HeartIcon>,
        active: <HeartIcon color='#0095f6'></HeartIcon>,
        link: '/direct/inbox',
      },
      {
        content: 'Create',
        icon: <PlusIcon></PlusIcon>,
        active: <PlusIcon color='#0095f6'></PlusIcon>,
        link: '/direct/inbox',
      },
      {
        content: 'Profile',
        icon: <Avatar size='small'></Avatar>,
        active: <Avatar size='small'></Avatar>,
        link: `/profile/${currentUser?._id}`,
      },
    ],
    [currentUser?._id],
  );

  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <nav className='flex-col relative z-20 lg:min-w-[250px] bg-white hidden h-screen px-2 py-3 border-r border-grayPrimary lg:pl-0 lg:pr-4 md:flex'>
        <div className='hidden w-2/3 pl-4 mt-5 mb-10 lg:block'>
          <img src={instagram} alt='instagram' className='object-cover w-full h-full' />
        </div>
        <ul className='flex flex-col flex-1 mt-2 lg:mt-0'>
          {navbarList.map((nav, idx) => {
            if (nav.content === 'Search') {
              return (
                <li
                  aria-hidden
                  onClick={() => setShow(!show)}
                  key={idx}
                  className={`flex items-center gap-3 py-2 pl-2 pr-2 transition-all ease-linear rounded md:mt-2 lg:pl-4 lg:pr-0 hover:bg-grayPrimary`}
                >
                  {nav.icon}
                  <span className='hidden select-none lg:block'>{nav.content}</span>
                </li>
              );
            } else {
              return (
                <NavLink key={idx} to={nav.link}>
                  {({ isActive }) => (
                    <li
                      className={`flex items-center gap-3 py-2 pl-2 pr-2 transition-all ease-linear rounded md:mt-2 lg:pl-4 lg:pr-0 hover:bg-grayPrimary ${
                        isActive ? 'bg-grayPrimary' : ''
                      }`}
                    >
                      {nav.icon}
                      <span className='hidden select-none lg:block'>{nav.content}</span>
                    </li>
                  )}
                </NavLink>
              );
            }
          })}
        </ul>
        <button className='flex items-center gap-3 py-2 pl-2 pr-2 rounded lg:mt-2 lg:pl-4 lg:pr-0 hover:bg-grayPrimary'>
          <BarIcon></BarIcon>
          <span className='hidden select-none lg:block'>More</span>
        </button>
      </nav>
      <div
        className={`absolute transition-all z-10 duration-200 top-0 left-0 invisible opacity-0  bottom-0 ${
          show ? 'lg:left-[250px] md:visible md:opacity-100 md:left-[57px]' : 'md:left-4 lg:left-16'
        }`}
      >
        <Search></Search>
      </div>
    </>
  );
};

export default Navbar;