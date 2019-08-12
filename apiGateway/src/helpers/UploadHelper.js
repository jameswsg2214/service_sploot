const config = require("../config/config");
const fs = require("fs-extra");
const _ = require("lodash");

class UploadHelper {
	constructor(files, id, role) {
		this.files = files;
		this.id = id;
		this.role = role;

		this.errImgs = {};
		this.successImgs = {};
	}

	async moveFile(from, to, file_name, fieldname) {
		try {
			// throw "jahir";

			await fs.move(from, to);

			if (!this.successImgs[fieldname]) this.successImgs[fieldname] = [];

			this.successImgs[fieldname].push(file_name);
			console.log("success!");
		} catch (err) {
			fs.pathExists(from, (err, exists) => {
				if (exists) {
					fs.remove(from, err => {
						if (err) return console.error(err);

						console.log(file_name, " ----> remove success!");
					});
				}
			});

			if (!this.errImgs[fieldname]) this.errImgs[fieldname] = [];

			this.errImgs[fieldname].push(file_name);
		}
	}

	getFolderPath() {
		let { id } = this;

		return `${id % 100}/${id % 1000}`;
	}

	saveImageRecord(user_type, imgId) {
		console.log(user_type, "user_type");
		console.log(this, "this");
		let { files, id, role } = this;
		let folder_path = this.getFolderPath();

		this.errImgs = {};
		this.successImgs = {};
		let base_path = `${config.UPLOAD_PATH}/${user_type}/${id}/${folder_path}`;

		return new Promise(async (resolve, reject) => {
			await _.forEach(files, file => {
				let to_image;
				let base_img_path = `${base_path}/${file.fieldname}/`;
				if (imgId && file.fieldname !== "profileImg") {
					base_img_path = base_img_path + `${imgId}/`;
				}

				if (file.fieldname === "profileImg" || file.fieldname === "clinicRegCert") {
					this.removeImage(base_img_path);
				}
				if (file.fieldname === "profileImg") {
					let filename = `${id}.${file.originalname.split(".").pop()}`;
					to_image = `${base_img_path}/${filename}`;
				} else if (file.fieldname === "file" || file.fieldname === "image") {
					to_image = `${base_img_path}/${file.originalname}`;
				} else {
					to_image = `${base_img_path}/${role}-${file.originalname}`;
				}

				this.moveFile(file.path, to_image, file.originalname, file.fieldname);
			});

			if (_.size(this.errImgs) == 0) resolve({ status: "success", records: this.successImgs });
			else reject({ status: "error", records: this.errImgs });
		});
	}

	deleteImage(user_type, imgId) {
		let { files, id } = this;
		let folder_path = this.getFolderPath();
		let base_path = `${config.UPLOAD_PATH}/${user_type}/${id}/${folder_path}`;
		_.forEach(files, file => {
			let base_img_path = `${base_path}/${file.fieldname}/`;
			if (imgId) {
				base_img_path = base_img_path + `${imgId}/`;
			}
			fs.unlink(base_img_path + file.originalname);
		});
	}

	removeImage(path) {
		console.log("path", path);
		return new Promise(async (resolve, reject) => {
			await fs.readdir(path, (err, images) => {
				_.forEach(images, image => {
					fs.unlink(`${path}/${image}`);
				});
				resolve({ response: "success" });
			});
		});
	}

	deleteFolder(id) {
		let base_path = `${config.UPLOAD_PATH}/attachment/${id}`;
		console.log("base_path", base_path);
		//fs.remove('base_path');
	}

	getCertificateImage(user_type) {
		let id = this.id;
		let folder_path = this.getFolderPath();
		let base_path = `${config.UPLOAD_PATH}/${user_type}/${id}/${folder_path}/clinicRegCert/`;
		return new Promise(async (resolve, reject) => {
			fs.readdir(base_path, (err, list) => {
				if (list && list.length > 0) {
					resolve({ status: "success", image: list[0] });
				} else {
					resolve({ status: "success" });
				}
			});
		});
	}

	getDentistImage(user_type) {
		let id = this.id;
		let folder_path = this.getFolderPath();
		let base_path = `${config.UPLOAD_PATH}/${user_type}/${id}/${folder_path}/dentistCert/`;
		return new Promise(async (resolve, reject) => {
			fs.readdir(base_path, (err, list) => {
				if (list && list.length > 0) {
					resolve({ status: "success", image: list[0] });
				} else {
					resolve({ status: "success" });
				}
			});
		});
	}

	getBusinessCertImage(user_type) {
		let id = this.id;
		let folder_path = this.getFolderPath();
		let base_path = `${config.UPLOAD_PATH}/${user_type}/${id}/${folder_path}/businessRegCert/`;
		return new Promise(async (resolve, reject) => {
			fs.readdir(base_path, (err, list) => {
				if (list && list.length > 0) {
					resolve({ status: "success", image: list[0] });
				} else {
					resolve({ status: "success" });
				}
			});
		});
	}

	getDownloadPath(user_type) {
		const folder_path = this.getFolderPath();
		const base_path = `${config.UPLOAD_PATH}/${user_type}/${this.id}/${folder_path}`;
		return base_path;
	}
}

module.exports = UploadHelper;
