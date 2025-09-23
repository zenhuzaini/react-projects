import { useState } from "react";
import BannerHeader from "../components/BannerHeader/BannerHeader";
import { projectBreadcrumbs } from "../constants/breadcrumbs";
import { txt } from "../constants/text";
import type {
	historyVersionType,
	toggleOptionsType,
} from "../types/components";
import { versionOptions } from "../mocks/versions";
import "../css/Project.css";

import SelectVersion from "../components/Select/SelectVersion";
import ToggleMenu from "../components/Menus/ToggleMenu";

const Project = () => {
	const [version, _setVersion] = useState<historyVersionType[]>(versionOptions);
	const [selectedIdVersion, setSelectedIdVersion] = useState<string>("");
	const [toggleOption, setToggleOption] =
		useState<toggleOptionsType>("reconciliation");

	// todo, check the active tab and change the title value
	return (
		<>
			<div>
				<BannerHeader
					breadcrumbsData={projectBreadcrumbs.projectReconciliation}
					title={txt.project.reconciliation.title}
					id="3"
					description={txt.project.reconciliation.description}>
					<SelectVersion
						versions={version}
						selectedIdVersion={selectedIdVersion}
						setSelectedIdVersion={setSelectedIdVersion}></SelectVersion>
				</BannerHeader>
				<main className="main-content-container-project">
					<div className="menuProject">
						<ToggleMenu
							toggleOption={toggleOption}
							setToggleOption={setToggleOption}
							toggleMenuData={txt.project.menus}></ToggleMenu>
					</div>
				</main>
			</div>
		</>
	);
};

export default Project;
