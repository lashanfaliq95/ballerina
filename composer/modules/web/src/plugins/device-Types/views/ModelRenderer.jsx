/**
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import TreeView from 'react-treeview';
import TreeUtil from 'plugins/ballerina/model/tree-util';

/**
 * Model Renderer
 */
class ModelRenderer extends React.Component {
    constructor() {
        super();
        this.state = { data: [] };
    }

    getDevices() {
        fetch('http://localhost:8280/api/device-mgt/v1.0/device-types', {
            method: 'GET',
            headers: {
                authorization: 'Bearer e41f1691-99a4-3332-81a4-957ca83ee7b3',
            },
        }).then(response => response.json())
            .then((data) => {
                this.setState({ data: data.deviceTypes });
            });
    }

    render() {
        const { model } = this.props;
        if (!model || !model.topLevelNodes || !model.topLevelNodes.length) {
            return null;
        }
        this.getDevices();
        return (
            <div>
                <TreeView
                    key='package'
                    nodeLabel={
                        <span>
                            <i className='fw fw-package' />{TreeUtil.getPackageNameString(model) || model.name}
                        </span>
                    }
                >
                    <div>
                        {
                            this.state.data.map((item, i) => {
                                return <p>{item}</p>;
                            })
                        }
                    </div>
                </TreeView>
            </div>
        );
    }
}

ModelRenderer.propTypes = {
    goToNode: PropTypes.func,
    model: PropTypes.objectOf(Object).isRequired,
    scrollPosition: PropTypes.objectOf(Object).isRequired,
};

ModelRenderer.defaultProps = {
    model: {},
    goToNode: () => {},
    scrollPosition: {},
};

export default ModelRenderer;
