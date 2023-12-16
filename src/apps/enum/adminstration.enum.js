const adminstration = {
	CEO: { role: "CEO", privilege: "ADMIN" },
	FOUNDER: { role: "FOUNDER", privilege: "ADMIN" },
	VPENGG: { role: "VPENGG", privilege: "ADMIN" },
	VPHR: { role: "VPHR", privilege: "ADMIN" },
	ENGGMANAGER: { role: "ENGGMANAGER", privilege: "STANDARD" },
	QAMANAGER: { role: "QAMANAGER", privilege: "STANDARD" },
	PRODUCTMANAGER: { role: "PRODUCTMANAGER", privilege: "STANDARD" },
	DEVELOPER: { role: "DEVELOPER", privilege: "USER" },
	QA: { role: "QA", privilege: "USER" },
	DESIGNER: { role: "DESIGNER", privilege: "USER" }
}

module.exports = { adminstration }
