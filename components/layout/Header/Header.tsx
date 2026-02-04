import LanguageSwitcher from "@/components/I18n/LanguageSwitcher";
import Logo from "@/components/UI/Logo";
import SectionContainer from "@/components/UI/SectionContainer";
import Link from "next/link";
import NavList from "./NavList";

const Header = () => {
  return (
    <header className="py-11">
      <SectionContainer>
        <div className="flex justify-between items-center">
          <Link href={"/"} className="flex items-center mr-9.25 gap-3">
            <Logo />
            <p className="hidden xl:block font-title text-title-xs">
              Echocode.app
            </p>
          </Link>
          <NavList />
          <LanguageSwitcher />
        </div>
      </SectionContainer>
    </header>
  );
};

export default Header;
