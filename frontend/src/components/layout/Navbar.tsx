import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
    return (
        <NavigationMenu className={`hidden md:flex`}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>
                            {" "}
                            <a href="#features">what is Fundar</a>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>How it Works</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>
                            <a href="#howitworks">How to use Fundar</a>
                        </NavigationMenuLink>
                        <NavigationMenuLink>
                            <a href="#preview">preview</a>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>FAQs</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>
                            <a href="#faqs">Have questions?</a>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>
                            <a href="mailto:chetadev01@gmail.com">
                                send an email
                            </a>
                        </NavigationMenuLink>
                        <NavigationMenuLink>
                            <a href="#footer">links</a>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Ai Insights</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>Coming soon</NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navbar;
